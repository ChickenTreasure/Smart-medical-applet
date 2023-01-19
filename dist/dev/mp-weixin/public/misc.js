"use strict";
const common_vendor = require("../common/vendor.js");
function uploadImage(url, su_title, err_title) {
  return new Promise((resolve, reject) => {
    common_vendor.index.chooseMedia({
      count: 1,
      mediaType: ["image"],
      sizeType: ["compressed"],
      sourceType: ["album", "camera"],
      camera: "back",
      success: (res) => {
        console.log(res);
        common_vendor.index.chooseImage({
          success: (res2) => {
            console.log(res2);
            common_vendor.index.showLoading({ title: su_title, mask: true });
            common_vendor.index.uploadFile({
              url,
              filePath: res2.tempFiles[0].tempFilePath,
              name: "file",
              header: { accept: "application/json" },
              success: (res_img) => {
                resolve(res_img);
                common_vendor.index.hideLoading();
              },
              fail: (err_img) => {
                reject(err_img);
                common_vendor.index.showToast({ title: err_title, icon: "error", duration: 1e3 });
              }
            });
          }
        });
      }
    });
  });
}
exports.uploadImage = uploadImage;
