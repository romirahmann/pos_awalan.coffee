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

const routeTree = rootRoute.addChildren([
  loginPage,
  protectedLayout.addChildren([mainLayout.addChildren([homePage])]),
]);

export const router = createRouter({
  routeTree,
});
