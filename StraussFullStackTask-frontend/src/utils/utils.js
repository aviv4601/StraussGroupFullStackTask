export function getGreeting() {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  console.log("currentHour: " + currentHour);
  if (currentHour >= 5 && currentHour < 12) {
    return "Good morning";
  } else if (currentHour >= 12 && currentHour < 17) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}
