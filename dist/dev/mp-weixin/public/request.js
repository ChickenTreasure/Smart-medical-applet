"use strict";
const common_vendor = require("../common/vendor.js");
const baseUrl = "https://meituan.thexxdd.cn/api/";
function getToken() {
  const token = common_vendor.index.getStorageSync("wxuser").user_Token || "";
  const base64_token = common_vendor.gBase64.encode(token + ":");
  return "Basic " + base64_token;
}
function request(url, method, data) {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: baseUrl + url,
      method,
      data,
      header: { Authorzation: getToken() },
      success: (res) => {
        if (res.statusCode == 200) {
          resolve(res);
        } else if (res.statusCode == 401) {
          reject(res);
        } else if (res.statusCode == 400) {
          common_vendor.index.showToast({
            title: "\u670D\u52A1\u5668\u53D1\u751F\u672A\u77E5\u9519\u8BEF",
            icon: "none",
            duration: 1e3
          });
          reject(res);
        } else if (res.statusCode == 500) {
          common_vendor.index.showToast({
            title: "\u5F00\u53D1\u8005\u67D0\u4E2A\u5B57\u6BB5\u6216\u53C2\u6570\u53D1\u751F\u9519\u8BEF",
            icon: "none",
            duration: 1e3
          });
          reject(res);
        } else if (res.statusCode == 202) {
          common_vendor.index.showToast({
            title: "res.data.msg",
            icon: "none",
            duration: 1e3
          });
          reject(res);
        } else {
          common_vendor.index.showToast({
            title: "\u670D\u52A1\u5668\u53D1\u751F\u672A\u77E5\u9519\u8BEF",
            icon: "none",
            duration: 1e3
          });
          reject(res);
        }
      },
      fail: (err) => {
        common_vendor.index.showToast({
          title: "\u6CA1\u6709\u6210\u529F\u83B7\u5F97\u6570\u636E",
          icon: "none",
          duration: 1e3
        });
        reject(err);
      }
    });
  });
}
const RequestApi = {
  FrontPage: () => request("frontpage", "GET", {}),
  NewappTime: () => request("newapptime", "GET", {}),
  RescoVid: (data) => request("rescovid", "POST", data),
  WxLogin: (data) => request("wx_login", "POST", data),
  CoviduserOrder: () => request("coviduser_order", "GET", {}),
  CovidCancel: (data) => request("covidcancel", "GET", data),
  OtuHpv: () => request("otuhpv", "GET", {}),
  HpvPack: () => request("hpv_pack", "GET", {}),
  HpvPrice: (data) => request("hpv_price", "POST", data),
  ResHpv: (data) => request("reshpv", "POST", data),
  HpvuserOrder: () => request("hpvuser_order", "GET", {}),
  HpvCancel: (data) => request("hpvcancel", "GET", data),
  NuataGet: () => request("nuataget", "GET", {}),
  ResNuata: (data) => request("resnuata", "POST", data),
  NuatauserOrder: () => request("nuatauser_order", "GET", {}),
  NuataCancel: (data) => request("nuatacancel", "GET", data),
  GetpaTient: () => request("get_patient", "GET", {}),
  AiCard: () => request("ai-card", "GET", {}),
  PatientRes: (data) => request("patient_res", "POST", data),
  GrapHics: (data) => request("graphics", "POST", data),
  PhySget: () => request("physget", "GET", {}),
  PhyTerm: () => request("phyterm", "GET", {}),
  PhyQuery: (data) => request("phyquery", "POST", data),
  PhydaTeil: (data) => request("phydateil", "GET", data),
  ResPhy: (data) => request("resphy", "POST", data),
  PhyuserOrder: () => request("phyuser_order", "GET", {}),
  PhyCancel: (data) => request("phycancel", "GET", data),
  DepressionTopics: () => request("depression_topics", "GET", {}),
  DepressiSon: (data) => request("depression", "GET", data),
  PrematureTopics: () => request("premature_topics", "GET", {}),
  PremaTure: (data) => request("premature", "GET", data),
  InsomniaTopics: () => request("insomnia_topics", "GET", {}),
  InsoMnia: (data) => request("insomnia", "GET", data),
  VideoList: (data) => request("video_list", "GET", data),
  DeparTment: () => request("department", "GET", {}),
  RegList: (data) => request("reglist", "GET", data),
  TimeSele: (data) => request("timesele", "GET", data),
  AlldList: (data) => request("alldlist", "GET", data),
  EverydList: (data) => request("everydlist", "GET", data),
  DoctorHome: (data) => request("doctorhome", "GET", data),
  RegAppoin: (data) => request("regappoin", "POST", data),
  UserreGistrat: () => request("user_registrat", "GET", {}),
  RegistCancel: (data) => request("regist_cancel", "GET", data)
};
let IMAGEURL = baseUrl + "upload_picture";
let AICARD = baseUrl + "ai_card";
exports.AICARD = AICARD;
exports.IMAGEURL = IMAGEURL;
exports.RequestApi = RequestApi;
