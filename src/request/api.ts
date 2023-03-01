import request from "./index";

// 请求中： 请求参数和返回值的类型都需要进行约束

// 验证码请求
// export const CaptchaAPI = ():Promise<CaptchaAPIRes> =>request.get("/prod-api/captchaImage");

// // 登录请求
export const LoginAPI = (data: LoginParams): Promise<RootStringData> => {
  return request({ url: "/api/login", params: data, method: "post" });
};
export const CaptchaAPI = (): Promise<string> => request.get("/api/captcha");
// tag
export const DelTagApi = (id: number): Promise<RootString> =>
  request.get(`/api/del/tag/${id}`);
export const UploadTagApi = (data: UploadTag): Promise<RootString> =>
  request.post(`/api/update/tag`, data);
export const AllTagApi = (): Promise<RootObject<tagRes>> =>
  request.get(`/api/tag/all`);
// video
export const GetAllVideoApi = (): Promise<RootRes<VideoData>> =>
  request.get(`/api/all/video`);
export const DelVideoApi = (id: number): Promise<RootString> =>
  request.get(`/api/admin/del/video/${id}`);
// user
export const DisableUserApi = (id: number): Promise<RootString> =>
  request.get(`/api/disable/user/${id}`);
export const EnableUserApi = (id: number): Promise<RootString> =>
  request.get(`/api/enable/user/${id}`);
export const GetAllUserApi = (): Promise<RootObject<UserIres>> =>
  request.get(`/api/all/user`);
export const resetPwdApi = (id: number): Promise<RootString> =>
  request.get(`/api/reset/password/${id}`);
