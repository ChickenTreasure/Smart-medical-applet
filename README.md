# 智慧医疗-在线挂号小程序

#### 介绍
智慧医疗-在线挂号小程序旨在搭建一个医疗在线挂号平台，采用前后端分离的开发模式，本人负责所有的前端部分，该小程序可用于新冠疫苗预约、HPV疫苗预约、图文咨询、预约挂号、健康体检预约、健康自测、医师课堂等应用模块。

主要技术栈: Vue3.2 + vue-cli + TypeScript + uniapp + vite。

#### 使用教程：

1.打开src/manifest.json文件，微信小程序配置里，更改为你自己的 小程序APPID

2.打开src/pages/login-page/index.vue，第37行， 把appid和secret秘钥改为你自己的小程序appid和秘钥

3.在根目录下执行 npm install(也可用pnpm，随意) 安装依赖，成功后， 再执行npm run dev:mp-weixin

4.打开微信开发者工具，创建项目，目录选择dist/dev/mp-weixin，打开项目后编译即可出现

#### 小程序演示
![image](https://user-images.githubusercontent.com/87047444/222321265-ad0d25d3-73af-44b7-b144-318a24bc410e.png)
![image](https://user-images.githubusercontent.com/87047444/222321337-ea42c6bf-ecd7-47c7-8cde-182c306662a4.png)
![image](https://user-images.githubusercontent.com/87047444/222321368-4056196b-ebb1-441c-90b8-202fe88c78d8.png)
![image](https://user-images.githubusercontent.com/87047444/222321390-be922183-1bd2-4938-bffd-8a2b42104e38.png)
![image](https://user-images.githubusercontent.com/87047444/222321447-536fffe1-9c69-40e0-9744-151d029941fd.png)
![image](https://user-images.githubusercontent.com/87047444/222321477-efacdef3-8337-4c0e-9eb4-e9c499553e60.png)
![image](https://user-images.githubusercontent.com/87047444/222321499-583744a6-36ec-4c81-b8c6-0bb607211a73.png)
![image](https://user-images.githubusercontent.com/87047444/222321532-f7cd0e84-ea32-45f7-bf65-d7c2954c3b7e.png)
![image](https://user-images.githubusercontent.com/87047444/222321578-adbe71f1-2f2f-4307-84f0-81ad1cb3c903.png)
![image](https://user-images.githubusercontent.com/87047444/222321614-a7e64f72-762a-4ceb-9b51-20fb29bb82a7.png)


#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request


