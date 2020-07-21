import axios from 'axios';

export default {
  submitFeeling: function (feelings) {
    return axios.post("/api/feelings", feelings);
  },
  getFeeling: function () {
    return axios.get("/api/feelings");
  },
  login: function(loginInfo) {
    return axios.post("/api/passport/auth", loginInfo)
  },
  signup: function(signupInfo) {
    return axios.post("/api/passport/create", signupInfo)
  },
  logout: function() {
    return axios.get("/api/passport/auth")
  },
  getByWeek: function(user) {
    return axios.get("/api/graph/week")
  },
  getByMonth: function(user) {
    return axios.get("/api/graph/month")
  },
  getByYear: function(user) {
    return axios.get("/api/graph/year")
  },
  getBySpecificMonth: function(month) {
    return axios.get("/api/feelings/month", month)
  },
};
