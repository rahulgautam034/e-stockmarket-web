import { applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import FilesystemStorage from "redux-persist-filesystem-storage";
import { createOffline } from "@redux-offline/redux-offline";
import offlineConfig from "@redux-offline/redux-offline/lib/defaults";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import rootReducer from "./reducers";
import rootSaga from "./sagas";
import { configureStore } from "@reduxjs/toolkit";

const persistConfig = {
  key: "fe-app",
  storage: FilesystemStorage,
  blacklist: ["apiProgressState"],
  stateReconciler: autoMergeLevel2,
  timeout: 0,
};

const {
  middleware: offlineMiddleware,
  enhanceReducer: offlineEnhanceReducer,
  enhanceStore: offlineEnhanceStore,
} = createOffline({
  ...offlineConfig,
  persist: false,
});

const middleware = [];
const enhancers = [];

const sagaMiddleware = createSagaMiddleware();
middleware.push(sagaMiddleware);

if (__DEV__) {
  const logger = createLogger();
  middleware.push(logger);
}

enhancers.push(applyMiddleware(...middleware, offlineMiddleware));
const reducer = persistReducer(
  persistConfig,
  offlineEnhanceReducer(rootReducer)
);
const store = configureStore(
  reducer,
  compose(
    offlineEnhanceStore,
    ...enhancers
  )
);
const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);

export { store, persistor };
