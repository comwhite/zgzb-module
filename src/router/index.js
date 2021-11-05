import { createWebHistory, createRouter } from "vue-router";

const history = createWebHistory();

// 路由工程化
const modules = import.meta.globEager("./modules/*.js");
const modulesDefault = Object.values(modules)
  ?.map((v) => v.default)
  ?.reduce((total, curModule) => {
    return total.concat(curModule);
  }, []);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("/@views/common/loading.vue"),
    meta: {
      title: "中广资本APP",
    },
  },
  ...modulesDefault,
  // 该条放在最后
  {
    path: "/:pathMatch(.*)",
    meta: {
      title: "404页面",
    },
    redirect: "/404",
  },
];

const router = createRouter({
  history,
  routes,
});

/**
 * 根据路由 决定页面是否添加水印
 */
router.afterEach((to) => {
  // 页面添加水印
  // if (to.meta.watermark) {
  //   const name = '中广资本APP'
  //   let account = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
  //   tools.watermark().set(`${name}(${account})`)
  // } else {
  //   tools.watermark().remove()
  // }
});

export default router;
