import request from "@/utils/request";

export function login(data) {
  return request({
    url: "/sys/user/login",
    method: "post",
    data,
  });
}

export function getInfo() {
  return request({
    url: "/sys/user/baseinfo",
    method: "get",
  });
}

export function logout() {
  return request({
    url: "/sys/user/logout",
    method: "post",
  });
}

export function userEdit(data) {
  return request({
    url: "/sys/user/edit",
    method: "post",
    data,
  });
}

export function userAdd(data) {
  return request({
    url: "/sys/user/add",
    method: "post",
    data,
  });
}

export function userPageList(params) {
  return request({
    url: "/sys/user/pagelist",
    method: "get",
    params
  });
}

export function usetResetPassword(data) {
  return request({
    url: "/sys/user/resetpassword",
    method: "post",
    data
  });
}
