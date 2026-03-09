export const API = process.env.REACT_APP_API_URL;

export const hackathonDate = new Date("2026-03-26T00:00:00");

export const calculateTimeLeft = () => {
  const diff = hackathonDate - new Date();

  if (diff <= 0) {
    return {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
      expired: true,
    };
  }

  return {
    days: String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, "0"),
    hours: String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
    minutes: String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, "0"),
    seconds: String(Math.floor((diff / 1000) % 60)).padStart(2, "0"),
    expired: false,
  };
};
