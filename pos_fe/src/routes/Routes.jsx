/* eslint-disable no-unused-vars */
import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { NotFoundPage } from "../pages/NotFound";
import { LoginPage } from "../pages/auth/LoginPage";
import { ProtectedRoute } from "../components/auth/ProtectedRoutes";
import { MainLayout } from "../layouts/MainLayouts";
import { Homepage } from "../pages/main/HomePage";
import { UserPage } from "../pages/main/users/UserPage";
import { RolePage } from "../pages/main/users/Rolespage";
import { PositionPage } from "../pages/main/users/PositionPage";
import { ProfilePage } from "../pages/main/users/ProfilePage";
import { OrderPage } from "../pages/main/orders/OrderPage";
import { DetailOrder } from "../pages/main/orders/DetailOrder";
import z from "zod";
import { ProductsPage } from "../pages/main/products/ProductsPage";

const rootRoute = createRootRoute({
  notFoundComponent: NotFoundPage,
});

const protectedLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: "protected-layout",
  component: ProtectedRoute,
});

const loginPage = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const mainLayout = createRoute({
  getParentRoute: () => protectedLayout,
  id: "main-layout",
  component: MainLayout,
});

const homePage = createRoute({
  getParentRoute: () => mainLayout,
  path: "/",
  component: Homepage,
});

// PRODUCTS
const productsPage = createRoute({
  getParentRoute: () => mainLayout,
  path: "products",
  component: ProductsPage,
});

// ORDER
const orderPage = createRoute({
  getParentRoute: () => mainLayout,
  path: "orders",
  component: OrderPage,
});

export const detailOrderPage = createRoute({
  getParentRoute: () => mainLayout,
  path: "orders/detail", // ❌ jangan pakai "/orders/detail"
  component: DetailOrder,
  validateSearch: (search) =>
    z
      .object({
        orderId: z.coerce.number(), // bisa "2" => 2
      })
      .parse(search),
});

// SETTING

const userPage = createRoute({
  getParentRoute: () => mainLayout,
  path: "settings/users",
  component: UserPage,
});

const rolePage = createRoute({
  getParentRoute: () => mainLayout,
  path: "settings/roles",
  component: RolePage,
});

const positionPage = createRoute({
  getParentRoute: () => mainLayout,
  path: "settings/positions",
  component: PositionPage,
});
const profilePage = createRoute({
  getParentRoute: () => mainLayout,
  path: "settings/profile",
  component: ProfilePage,
});

const routeTree = rootRoute.addChildren([
  loginPage,
  protectedLayout.addChildren([
    mainLayout.addChildren([
      homePage,
      userPage,
      rolePage,
      positionPage,
      profilePage,
      orderPage,
      detailOrderPage,
      productsPage,
    ]),
  ]),
]);

export const router = createRouter({
  routeTree,
});
