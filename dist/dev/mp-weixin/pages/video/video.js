"use strict";
const common_vendor = require("../../common/vendor.js");
const public_request = require("../../public/request.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "video",
  setup(__props) {
    common_vendor.onMounted(() => {
      retriData(0);
    });
    let video_data = common_vendor.ref([]);
    async function retriData(page) {
      const res = await public_request.RequestApi.VideoList({ page });
      video_data.value = [...video_data.value, ...res.data.data];
    }
    let loading = common_vendor.ref(false);
    let page_value = common_vendor.ref(0);
    common_vendor.onReachBottom(async () => {
      loading.value = true;
      page_value.value++;
      await retriData(page_value.value);
      loading.value = false;
    });
    function startPlay(index, vieo_id) {
      video_data.value[index].controls = true;
      video_data.value[index].play_but = false;
      dealWith(vieo_id, index);
    }
    let videoId = common_vendor.ref("");
    let videoIndex = common_vendor.ref(-1);
    function dealWith(video_id, index) {
      if (videoId.value == "") {
        videoId.value = video_id;
        videoIndex.value = index;
        common_vendor.index.createVideoContext(video_id).play();
      } else {
        if (videoId.value != video_id) {
          pauseFun(videoIndex.value);
        }
        setTimeout(() => {
          videoId.value = video_id;
          videoIndex.value = index;
          common_vendor.index.createVideoContext(video_id).play();
        }, 500);
      }
    }
    function pauseFun(index) {
      common_vendor.index.createVideoContext(videoId.value).pause();
      video_data.value[index].controls = false;
      video_data.value[index].play_but = true;
    }
    common_vendor.onShow(() => {
      common_vendor.index.createVideoContext(videoId.value).pause();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(common_vendor.unref(video_data), (item, index, i0) => {
          return common_vendor.e({
            a: item.video_url,
            b: item._id,
            c: item.controls,
            d: item.video_title,
            e: common_vendor.t(item.video_title),
            f: item.play_but
          }, item.play_but ? {
            g: common_vendor.o(($event) => startPlay(index, item._id))
          } : {}, {
            h: item.avatar,
            i: common_vendor.t(item.name),
            j: index
          });
        }),
        b: common_vendor.unref(loading)
      }, common_vendor.unref(loading) ? {} : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/LENOVO/Desktop/web\u524D\u7AEF/Vue\u9879\u76EE/\u667A\u6167\u533B\u7597-\u5728\u7EBF\u6302\u53F7/wechat-guahao/src/pages/video/video.vue"]]);
wx.createPage(MiniProgramPage);
