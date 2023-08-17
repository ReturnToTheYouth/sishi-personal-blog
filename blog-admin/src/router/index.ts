import { createRouter, createWebHashHistory } from "vue-router";

let routes = [
  {
    path: "/",
    name: "admin",
    component: () => import("@/layouts/admin.vue"),
  },
  {
    path: "/login",
    name: "login",
    //使用import可以路由懒加载，如果不使用，太多组件一起加载会造成白屏
    component: () => import("@/views/Login/index.vue"),
    meta: {
      keepAlive: false, //需要缓存
      title: "注册页",
    },
  },
  {
    // 配置404页面
    path: "/404",
    name: "404",
    component: () => import("@/views/404/index.vue"),
  },
  { path: "/:catchAll(.*)", redirect: "/404" },
];

export const asyncRoutes=[
      {
        path: "/",
        name: "首页",
        component: () => import("@/views/index.vue"),
        meta: {
          keepAlive: true,
          title: "首页",
        },
      },
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/Home/index.vue"),
        meta: {
          keepAlive: true,
          title: "home",
        },
      },
      {
        path: "/article/publish",
        name: "publishArticle",
        component: () => import("@/views/Article/article.vue"),
        meta: {
          keepAlive: false,
          title: "发布文章",
        },
      },
      {
        path: "/article/publish/:articleId",
        name: "editArticle",
        component: () => import("@/views/Article/article.vue"),
        meta: {
          keepAlive: false,
          title: "修改文章",
        },
      },
      {
        path: "/article/list",
        name: "articleList",
        component: () => import("@/views/Article/articleList.vue"),
        meta: {
          keepAlive: true,
          title: "文章列表",
        },
      },
      {
        path: "/article/tag",
        name: "articleTag",
        component: () => import("@/views/Tag/index.vue"),
        meta: {
          keepAlive: true,
          title: "标签管理",
        },
      },
      {
        path: "/news/comment",
        name: "newsComment",
        component: () => import("@/views/News/comment.vue"),
        meta: {
          keepAlive: true,
          title: "文章留言",
        },
      },
      {
        path: "/news/talkComment",
        name: "talkComment",
        component: () => import("@/views/News/talkComment.vue"),
        meta: {
          keepAlive: true,
          title: "说说评论",
        },
      },
      {
        path: "/news/message",
        name: "message",
        component: () => import("@/views/News/Message.vue"),
        meta: {
          keepAlive: true,
          title: "留言列表",
        },
      },
      {
        path: "/user/userList",
        name: "userinfo",
        component: () => import("@/views/User/index.vue"),
        meta: {
          keepAlive: true,
          title: "用户列表",
        },
      },
      {
        path: "/system/friend",
        name: "friendLink",
        component: () => import("@/views/System/friendLink.vue"),
        meta: {
          keepAlive: true,
          title: "友链管理",
        },
      },
      {
        path: "/talk/publish",
        name: "publishTalk",
        component: () => import("@/views/Talk/talk.vue"),
        meta: {
          keepAlive: false,
          title: "发布说说",
        },
      },
      {
        path: "/talk/publish/:talkId",
        name: "editTalk",
        component: () => import("@/views/Talk/talk.vue"),
        meta: {
          keepAlive: false,
          title: "修改说说",
        },
      },
      {
        path: "/talk/list",
        name: "talkList",
        component: () => import("@/views/Talk/talkList.vue"),
        meta: {
          keepAlive: false,
          title: "说说列表",
        },
      },
      {
        path: "/permission/role",
        name: "role",
        component: () => import("@/views/Permission/role.vue"),
        meta: {
          keepAlive: true,
          title: "角色管理",
        },
      },
      {
        path: "/permission/menu",
        name: "menu",
        component: () => import("@/views/Permission/menu.vue"),
        meta: {
          keepAlive: true,
          title: "菜单管理",
        },
      },
      {
        path: "/permission/resource",
        name: "resource",
        component: () => import("@/views/Permission/resource.vue"),
        meta: {
          keepAlive: true,
          title: "资源管理",
        },
      },
]

// 路由
export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

//定义动态添加路由方法
export const addRoutes = (menus:any) => {
  // 是否有新路由
  let hasNewRoutes = false;
  const findAndAddRoutesByMenus = (arr:any) => {
    arr?.forEach((e:any) => {
      let item = asyncRoutes.find((o:any) => {
        return o.path == e.path
      });
      if (item && !router.hasRoute(item.path)) {
        router.addRoute("admin", item);
        hasNewRoutes = true;
      }
      if (e.children && e.children.length > 0) {
        findAndAddRoutesByMenus(e.children);
      }
    });
  };
  findAndAddRoutesByMenus(menus);
  return hasNewRoutes;
};

export const clearRoutes=()=> {
  for(let i=0;i<asyncRoutes.length;i++) {
    router.removeRoute(asyncRoutes[i].name)
  }
}


