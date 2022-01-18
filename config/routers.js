export default [
  {
    path: '/',
    component: '@/layouts/BlankLayout',
    routes: [
      {
        name: 'user',
        path: '/user',
        component: '@/layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: '@/pages/user/Login',
          },
        ],
      },
      {
        path: '/',
        component: '@/layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '@/layouts/BasicLayout',
            routes: [
              {
                path: '/',
                component: 'index',
                title: 'index',
              },
              {
                exact: true,
                path: '/product/list',
                component: '@/pages/List',
                title: 'list',
              },
              {
                path: '/product/detail',
                component: '@/pages/Detail',
                title: 'detail',
              },
              {
                path: '/product/index1',
                component: '@/pages/Index1',
                title: 'index1',
              },
              {
                path: '/product/index2',
                component: '@/pages/Index2',
                title: 'index2',
              },
              {
                path: '/product/index3',
                component: '@/pages/Index3',
                title: 'index3',
              },
            ],
          },
        ],
      },
    ],
  },
];
