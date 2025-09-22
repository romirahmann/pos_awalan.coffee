/* eslint-disable no-unused-vars */
import { createContext } from "react";

// let dynamicBaseAPI = "http://192.168.9.192:3000/api";
// let dynamicBaseURL = "http://192.168.9.192:3000";
let dynamicBaseAPI = "http://192.168.1.10:3000/api";
let dynamicBaseURL = "http://192.168.1.10:3000";

export const ApiUrl = createContext(dynamicBaseAPI);

export const UrlBaseBackend = createContext(dynamicBaseURL);
export const api = dynamicBaseAPI;
export const baseApi = dynamicBaseAPI;
export const baseUrl = dynamicBaseURL;
