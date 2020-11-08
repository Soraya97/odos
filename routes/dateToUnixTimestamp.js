export default (dateInput) => {
  let date = new Date(dateInput);
  let time = Math.round(date.getTime() / 1000);
  return time;
}
