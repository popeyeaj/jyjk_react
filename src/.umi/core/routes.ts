// @ts-nocheck
import React from 'react';
import { ApplyPluginsType, dynamic } from '/Users/evan/Sites/architecture/myapp2/node_modules/umi/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__BlankLayout' */'@/layouts/BlankLayout')}),
    "routes": [
      {
        "name": "user",
        "path": "/user",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__UserLayout' */'@/layouts/UserLayout')}),
        "routes": [
          {
            "name": "login",
            "path": "/user/login",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__user__Login' */'@/pages/user/Login')}),
            "exact": true
          }
        ]
      },
      {
        "path": "/",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__SecurityLayout' */'@/layouts/SecurityLayout')}),
        "routes": [
          {
            "path": "/",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__BasicLayout' */'@/layouts/BasicLayout')}),
            "routes": [
              {
                "path": "/",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__index' */'/Users/evan/Sites/architecture/myapp2/src/pages/index')}),
                "title": "index",
                "exact": true
              },
              {
                "exact": true,
                "path": "/product/list",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__List' */'@/pages/List')}),
                "title": "list"
              },
              {
                "path": "/product/detail",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Detail' */'@/pages/Detail')}),
                "title": "detail",
                "exact": true
              },
              {
                "path": "/product/index1",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Index1' */'@/pages/Index1')}),
                "title": "index1",
                "exact": true
              },
              {
                "path": "/product/index2",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Index2' */'@/pages/Index2')}),
                "title": "index2",
                "exact": true
              },
              {
                "path": "/product/index3",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Index3' */'@/pages/Index3')}),
                "title": "index3",
                "exact": true
              }
            ]
          }
        ]
      }
    ]
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
