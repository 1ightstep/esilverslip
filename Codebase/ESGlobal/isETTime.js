function getTimeFrame() {
  const date = new Date();
  const day = date.getDay();

  const hour = date.getHours();
  const minute = date.getMinutes();

  return {
    day: day,
    hour: hour,
    minute: minute,
  };
}

function isETTime() {
  const {hour, minute} = getTimeFrame();
  if (hour === 12 && minute === 47) {
    return true; 
  }
  return false;
}
