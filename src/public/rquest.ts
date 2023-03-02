// 公用的请求
const baseUrl = "https://meituan.thexxdd.cn/api/";

// 获取token// pnpm install -D js-base64
import { Base64 } from "js-base64";
function getToken(): string {
  const token = uni.getStorageSync("wxuser").user_Token || "";
  const base64_token: string = Base64.encode(token + ":");
  return "Basic " + base64_token;
}

// 请求
function request(
  url: string,
  method: "GET" | "POST",
  data: string | object | ArrayBuffer
) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: baseUrl + url,
      method,
      data,
      header: { Authorization: getToken() },
      success: (res: any) => {
        if (res.statusCode == 200) {
          resolve(res);
        } else if (res.statusCode == 401) {
          // 没有权限访问接口
          uni.navigateTo({ url: "/pages/login-page/index" });
          reject(res);
        } else if (res.statusCode == 400) {
          // 开发者参数填错
          uni.showToast({
            title: "开发者某个字段或参数填写不对",
            icon: "none",
            duration: 1000,
          });
        } else if (res.statusCode == 500) {
          // 服务端错误
          uni.showToast({
            title: "服务端发生未知错误",
            icon: "none",
            duration: 1000,
          });
          reject(res);
        } else if (res.statusCode == 202) {
          uni.showToast({
            title: res.data.msg,
            icon: "none",
            duration: 1000,
          });
          reject(res);
        } else {
          uni.showToast({
            title: "服务端发生未知错误",
            icon: "none",
            duration: 1000,
          });
          reject(res);
        }
      },
      fail: (err: any) => {},
    });
  });
}

// 接口
import type {
  Rescovidapi,
  Wxloginapi,
  Covidcancelapi,
  Hpvpriceapi,
  Reshpvapi,
  Resnuataapi,
  Patientres,
  Graphics,
  FilterData,
  PhyId,
  PhyRes,
  Regappoin
} from "./decl-type";
const RequestApi = {
  // 首页数据
  FrontPage: () => request("frontpage", "GET", {}),
  // 新冠疫苗预约时段
  NewappTime: () => request("newapptime", "GET", {}),
  // 新冠疫苗提交预约
  RescoVid: (data: Rescovidapi) => request("rescovid", "POST", data),
  // 小程序登陆
  WxLogin: (data: Wxloginapi) => request("wx_login", "POST", data),
  // 新冠疫苗预约订单
  CoviduserOrder: () => request("coviduser_order", "GET", {}),
  // 取消新冠疫苗预约
  CovidCancel: (data: Covidcancelapi) => request("covidcancel", "GET", data),
  // HPV疫苗列表
  OtuHpv: () => request("otuhpv", "GET", {}),
  // HPV疫苗套餐
  HpvPack: () => request("hpv_pack", "GET", {}),
  // 查询HPV套餐价格
  HpvPrice: (data: Hpvpriceapi) => request("hpv_price", "POST", data),
  // 提交HPV疫苗
  ResHpv: (data: Reshpvapi) => request("reshpv", "POST", data),
  // HPV疫苗预约订单
  HpvuserOrder: () => request("hpvuser_order", "GET", {}),
  // 取消HPV预约
  HpvCancel: (data: Covidcancelapi) => request("hpvcancel", "GET", data),
  // 获取核酸检测页面数据
  NuataGet: () => request("nuataget", "GET", {}),
  // 提交核酸检测预约
  ResNuata: (data: Resnuataapi) => request("resnuata", "POST", data),
  // 核酸检测订单
  NuatauserOrder: () => request("nuatauser_order", "GET", {}),
  // 取消核酸检测预约
  NuataCancel: (data: Covidcancelapi) => request("nuatacancel", "GET", data),
  // 获取就诊人信息
  GetpaTient: () => request("get_patient", "GET", {}),
  // 提交就诊人
  PatientRes: (data: Patientres) => request("patient_res", "POST", data),
  // 提交图文咨询
  GrapHics: (data: Graphics) => request("graphics", "POST", data),
  // 获取体检筛选条件
  PhyTerm: () => request("phyterm", "GET", {}),
  // 获取全部体检套餐
  PhySget: () => request("physget", "GET", {}),
  // 查询筛选体检套餐
  PhyQuery: (data: FilterData) => request("phyquery", "POST", data),
  // 体检套餐详情页数据
  PhydaTeil: (data: PhyId) => request("phydateil", "GET", data),
  // 体检预约提交
  ResPhy: (data: PhyRes) => request("resphy", "POST", data),
  //获取体检套餐订单
  PhyuserOrder: () => request("phyuser_order", "GET", {}),
  // 24. 取消体检预约
  PhyCancel: (data: Covidcancelapi) => request("phycancel", "GET", data),
  // 26. 获取抑郁症题目    GET    /depression_topics
  DepressionTopics: () => request("depression_topics", "GET", {}),
  // 27. 抑郁症测试结果   GET   /depression?query=
  DepressiSon: (data: { value: string[] }) =>
    request("depression", "GET", data),
  // 28. 获取早泄题目    GET   /premature_topics
  PrematureTopics: () => request("premature_topics", "GET", {}),
  // 29. 早泄测试结果    GET   /premature?query=
  PremaTure: (data: { value: string[] }) => request("premature", "GET", data),
  // 30. 获取失眠题目    GET   /insomnia_topics
  InsomniaTopics: () => request("insomnia_topics", "GET", {}),
  // 31. 失眠测试结果    GET   /insomnia?query=
  InsoMnia: (data: { value: string[] }) => request("insomnia", "GET", data),
  // 32. 获取短视频数据    GET   /video_list?query=
  VideoList: (data: { page: number }) => request('video_list', 'GET', data),
  // 33. 获取父科室列表    GET    /department
  DeparTment: () => request('department', 'GET', {}),
  // 34. 获取父科室下的子科室   GET   /reglist?query=
  RegList: (data: { id: string }) => request('reglist', 'GET', data),
  // 35. 获取选择医生的日期    GET   /timesele?query=
  TimeSele: (data: { dep_id: string }) => request('timesele', 'GET', data),
  // 36. 获取选择的科室下的全部医生列表     GET    /alldlist?query=
  AlldList: (data: { dep_id: string }) => request('alldlist', 'GET', data),
  // 37. 根据时间筛选挂号医生    GET    /everydlist?query=
  EverydList: (data: { dep_id: string; week: string }) =>
  	request('everydlist', 'GET', data),
  // 38. 挂号医生主页   GET   /doctorhome?query=
  DoctorHome: (data: { _id: string }) => request('doctorhome', 'GET', data),
  // 39. 提交挂号预约   POST   /regappoin
  RegAppoin: (data: Regappoin) => request('regappoin', 'POST', data),
  // 40. 获取每个用户的挂号记录    GET    /user_registrat
  UserreGistrat: () => request('user_registrat', 'GET', {}),
  // 41. 取消预约挂号    GET   /regist_cancel?query=
  RegistCancel: (data: { _id: string }) =>
  	request('regist_cancel', 'GET', data),
};
// 图片上传接口
let IMAGEURL = baseUrl + "upload_picture";
// 身份证识别
let AICARD = baseUrl + "ai_card";

export default RequestApi;
export { request, IMAGEURL, AICARD };
