import { cafeApi } from "@/app/api/cafe-api.js";
import { userApi } from "@/app/api/user-api.js";

/**
 * API routes for CRUD. Backend JSON only, no views.
 * Controllers handle frontend (views, redirects); api/* handles API.
 */
export const apiRoutes = [
  ...[
    { method: "POST", path: "/api/users", handler: userApi.create.handler },
    { method: "POST", path: "/api/users/authenticate", handler: userApi.authenticate.handler },
  ],
  ...[
    { method: "GET", path: "/api/cafes", handler: cafeApi.list.handler },
    { method: "GET", path: "/api/cafes/category/{category}", handler: cafeApi.getByCategory.handler },
    { method: "GET", path: "/api/cafes/{id}", handler: cafeApi.getOne.handler },
    { method: "POST", path: "/api/cafes", handler: cafeApi.create.handler },
    { method: "PUT", path: "/api/cafes/{id}", handler: cafeApi.update.handler },
    { method: "DELETE", path: "/api/cafes/{id}", handler: cafeApi.remove.handler },
  ],
];
