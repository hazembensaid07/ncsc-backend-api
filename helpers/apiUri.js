module.exports = function apiUri() {
  if (process.env.NODE_ENV == "dev") return "/api";
  else return "ff";
};
