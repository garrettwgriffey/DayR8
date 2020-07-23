import axios from 'axios';

export default {
  submitFeeling: function (feelings) {
    return axios.post("/api/feelings/:" + feelings.user, feelings);
  },
  getFeeling: function (user) {
    return axios.get("/api/feelings/:" + user);
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
    return axios.get("/api/graph/week/:" + user.user)
  },
  getByMonth: function(user) {
    return axios.get("/api/graph/month/:" + user.user)
  },
  getByYear: function(user) {
    return axios.get("/api/graph/year/:" + user.user)
  },
  getBySpecificMonth: function(month) {
    return axios.get("/api/feelings/month/:" + month.month + "/:" + month.year + "/:" + month.user)
  },
  getLastEntry: function(user) {
    return axios.get("api/feelings/last/:" + user)
  }
};
