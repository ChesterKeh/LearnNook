import * as usersAPI from "./user-api";

export async function signUp(userData) {
  const res = await usersAPI.signUp(userData);
  const token = res.token;
  if (!res) {
    return null;
  }
  const payload = JSON.parse(atob(token.split(".")[1]));
  if (payload.exp < Date.now() / 1000) {
    localStorage.removeItem("token");
    return null;
  }
  localStorage.setItem("token", token);
  return res.user;
}

export function getToken() {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  const payload = JSON.parse(atob(token.split(".")[1]));
  if (payload.exp < Date.now() / 1000) {
    localStorage.removeItem("token");
    return null;
  }
  return token;
}

export async function getUser(userId) {
  const response = await usersAPI.getUser(userId);
  return response;
}

export async function login(loginData) {
  const response = await usersAPI.login(loginData);
  localStorage.setItem("token", response.token);
  return response;
}

export async function logout() {
  localStorage.removeItem("token");
}
