import axios from "axios";

export default {
  submitFeeling: function (feelings) {
    console.log(feelings);
    return axios.post("/api/feelings/", feelings);
  },
};
