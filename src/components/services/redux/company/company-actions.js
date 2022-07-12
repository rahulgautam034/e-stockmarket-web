export const REQUEST_COMPANY = "REQUEST_COMPANY";
export const RECEIVED_COMPANY = "RECEIVED_COMPANY";

// Actions
export function requestCompany(action) {
  return {
    type: REQUEST_COMPANY,
    action
  };
}

export function receivedCompany(searchValue) {
  return {
    type: RECEIVED_COMPANY,
    searchValue,
    lastUpdated: Date.now(),
  };
}
