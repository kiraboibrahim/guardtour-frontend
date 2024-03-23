import { createContext } from "react";
import { ACCESS_TOKEN_KEY_NAME } from "./constants";
import { LOGIN_URL, SITES_URL } from "../../services/config";
import { jwtDecode } from "jwt-decode";

export const AnonymousUser = {
  isAuthenticated: false,
};

export function createUser(access_token) {
  saveAccessToken(access_token);
  const decodedJWT = jwtDecode(access_token);
  const {
    username,
    firstName,
    sub,
    role,
    companyId,
    deployedSiteId,
    managedSiteId,
  } = decodedJWT;
  return {
    username,
    firstName,
    id: sub,
    role,
    companyId,
    isAuthenticated: true,
    deployedSiteId,
    managedSiteId,
  };
}
export function getUser() {
  const access_token = getAccessToken();
  if (!access_token) return AnonymousUser;
  return createUser(access_token);
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY_NAME);
}

export function saveAccessToken(access_token) {
  localStorage.setItem(ACCESS_TOKEN_KEY_NAME, access_token);
}

export function removeAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY_NAME);
}

export function addAuthorizationInterceptor(config) {
  const siteDetailURLRegex = new RegExp(`${SITES_URL}/[0-9]+$`);
  const exemptFromAuth =
    config.url === LOGIN_URL || siteDetailURLRegex.test(config.url);
  if (!exemptFromAuth) {
    const access_token = getAccessToken() || "";
    config.headers["Authorization"] = `Bearer ${access_token}`;
  }
  return config;
}

const UserContext = createContext();
export default UserContext;
