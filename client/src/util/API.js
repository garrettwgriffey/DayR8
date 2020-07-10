import axios from "axios";

export default {
  submitFeeling: function (feelings) {
    return axios.post("/api/feelings/", feelings);
  },
  getFeeling: function () {
    return axios.get("/api/feelings/");
  },
  login: function () {
    return axios.post("/api/passport/auth")
  },
  signup: function() {
    return axios.post("/api/passport/create")
  },
  logout: function() {
    return axios.get("/api/passport/auth")
  }
};
