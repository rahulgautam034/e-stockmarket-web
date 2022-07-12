export const dayMonth = (d) => {
  return d < 10 ? "0" + d : d;
};

export const getDate = (d) => {
  let date = new Date(d);

  return (
    date.getFullYear() +
    "-" +
    dayMonth(date.getMonth() + 1) +
    "-" +
    dayMonth(date.getDate())
  );
};

export const getTime = (d) => {
  let date = new Date(d);

  return dayMonth(date.getHours()) + "-" + dayMonth(date.getMinutes()) + "-" + dayMonth(date.getSeconds());
};
