let apiUrl;
let siteUrl;
if (process.env.NODE_ENV && process.env.NODE_ENV === "development") {
  console.log("Development backend");
  apiUrl = "http://localhost:3099";
  siteUrl = "http://localhost:3000";
} else {
  apiUrl = "https://api.kuty.me";
  siteUrl = "https://kuty.me";
}

export { apiUrl, siteUrl };
