import axios from "axios";

export default {
  submitFeeling: function (feelings) {
    return axios.post("/api/feelings/", feelings);
  },
  getFeeling: function () {
    return axios.get("/api/feelings/");
  },
};
