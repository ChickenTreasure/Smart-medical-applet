"use strict";
const common_vendor = require("../../common/vendor.js");
const public_request = require("../../public/request.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "topic",
  setup(__props) {
    let judge_value = common_vendor.ref("");
    common_vendor.onLoad((event) => {
      let { type, name } = event;
      judge_value.value = type;
      common_vendor.index.setNavigationBarTitle({
        title: name
      });
    });
    let topic_data = common_vendor.ref([]);
    let topic_length = common_vendor.ref(0);
    let each_question = common_vendor.reactive({
      data: {
        topic: "",
        _id: "",
        options: []
      }
    });
    let { data } = common_vendor.toRefs(each_question);
    common_vendor.onShow(async () => {
      add_to.value = 0;
      add_to_s.value = 1;
      percent.value = 0;
      topic_id.value = [];
      if (judge_value.value == "001") {
        var res = await public_request.RequestApi.DepressionTopics();
        console.log(res);
      } else if (judge_value.value == "002") {
        var res = await public_request.RequestApi.PrematureTopics();
        console.log(res);
      } else {
        var res = await public_request.RequestApi.InsomniaTopics();
        console.log(res);
      }
      topic_data.value = res.data.data;
      topic_length.value = res.data.data.length;
      each_question.data = res.data.data[0];
      percent.value = 100 / topic_length.value;
    });
    let add_to = common_vendor.ref(0);
    let add_to_s = common_vendor.ref(1);
    let percent = common_vendor.ref(0);
    let topic_id = common_vendor.reactive({
      value: []
    });
    function choose(son_id) {
      if (add_to_s.value < topic_length.value) {
        add_to.value++;
        add_to_s.value++;
        percent.value = 100 / topic_length.value * add_to_s.value;
        topic_id.value.push(son_id);
        each_question.data = topic_data.value[add_to.value];
      } else {
        topic_id.value.push(son_id);
        let OBJ = JSON.stringify({ type: judge_value.value, topic_id: topic_id.value });
        common_vendor.index.navigateTo({
          url: "/pages/self-test/result?value=" + OBJ
        });
      }
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(percent),
        b: common_vendor.t(common_vendor.unref(add_to_s)),
        c: common_vendor.t(common_vendor.unref(topic_length)),
        d: common_vendor.t(common_vendor.unref(data).topic),
        e: common_vendor.f(common_vendor.unref(data).options, (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: index,
            c: common_vendor.o(($event) => choose(item.son_id), index)
          };
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/LENOVO/Desktop/web\u524D\u7AEF/Vue\u9879\u76EE/\u667A\u6167\u533B\u7597-\u5728\u7EBF\u6302\u53F7/wechat-guahao/src/pages/self-test/topic.vue"]]);
wx.createPage(MiniProgramPage);
