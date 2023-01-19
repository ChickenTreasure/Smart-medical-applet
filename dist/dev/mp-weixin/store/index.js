"use strict";
const common_vendor = require("../common/vendor.js");
const myData = common_vendor.defineStore("my_data", {
  state: () => ({
    patient: {}
  }),
  actions: {
    addPatient(value) {
      console.log(value);
      this.patient = value;
    }
  }
});
exports.myData = myData;
