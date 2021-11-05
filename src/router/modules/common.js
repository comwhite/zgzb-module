const common = [
  {
    path: "/solution",
    name: "Solution",
    component: () => import("/@views/common/solution.vue"),
    meta: {
      title: "遇到问题",
      auth: false,
      pageStatus: 3,
    },
  },
  {
    path: "/update",
    name: "Update",
    component: () => import("/@views/common/update.vue"),
    meta: {
      title: "系统维护中···",
      auth: false,
      pageStatus: 2,
    },
  },
  {
    path: "/404",
    name: "404",
    component: () => import("/@views/common/404.vue"),
    meta: {
      title: "Not Found",
      auth: false,
      pageStatus: 2,
    },
  },
  {
    path: "/502",
    name: "502",
    component: () => import("/@views/common/502.vue"),
    meta: {
      title: "Server Update",
      auth: false,
      pageStatus: 2,
    },
  },
  {
    path: "/download",
    name: "download",
    component: () => import("/@views/common/download.vue"),
    meta: {
      title: "Server Update",
      auth: false,
      pageStatus: 2,
    },
  },
  {
    path: "/device",
    name: "device",
    component: () => import("/@views/common/deviceDetail.vue"),
    meta: {
      title: "设备信息",
      auth: false,
      pageStatus: 1,
    },
  },
  {
    path: "/woa",
    name: "woa",
    component: () => import("/@views/common/woa.vue"),
    meta: {
      title: "跳转",
      auth: false,
      pageStatus: 9,
    },
  },
];

export default common;
