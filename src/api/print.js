import request from "@/utils/request";

export function printLogList(params) {
  return request({
    url: "/sys/printlog/pageList",
    method: "get",
    params,
  });
}

export function printLogAdd(data) {
  return request({
    url: "/sys/printlog/add",
    method: "post",
    data,
  });
}
