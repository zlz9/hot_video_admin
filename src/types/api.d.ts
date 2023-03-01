// 这个文件专门定义请求参数的类型，和响应的类型

// 验证码的响应类型约束
interface CaptchaAPIRes {
  msg: string;
  img: string;
  code: number;
  captchaEnabled: boolean;
  uuid: string;
}
// 登录请求参数类型约束
interface LoginAPIReq {
  userName: string;
  password: string;
  code: string;
}
// 登录的响应类型约束
interface LoginAPIRes {
  msg: string;
  code: number;
  token: string;
}
interface UploadTag {
  icon: string;
  tagName: string;
}

interface LoginParams {
  code: string;
  password: string;
  userName: string;
}
interface PageParams {
  tagId?: number;
  page: number;
  pageSize: number;
}

interface RegisterParams {
  email: string;
  password: string;
  userName: string;
  code: string;
}

interface CommentPage {
  id: number;
  page: number;
  pageSize: number;
}

interface LikeParams {
  infoId: number;
  userId: number;
}

interface Comment {
  content: any;
  level: any;
  parentId: any;
  toUserId: any;
  videoId: any;
}

interface PublishApi {
  tagIds: Array<number>;
  isTop: boolean;
  name: string;
  selfIntroduction: string;
  url: string;
}

interface userUpload {
  avatar: string;
  newPwd: string;
  nickName: string;
  oldPwd: string;
  selfIntroduction: string;
}
