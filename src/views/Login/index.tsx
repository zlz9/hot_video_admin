import { ChangeEvent, useEffect, useState } from "react";
import { Input, Space, Button, message } from "antd";
import styles from "./login.module.scss";
import initLoginBg from "./init.ts";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "./login.less";
import { useNavigate } from "react-router-dom";
import { CaptchaAPI, LoginAPI } from "@/request/api";
import UserStatus from "@/store/UserStatus";
import { useSelector, useDispatch } from "react-redux";
let imgUrl = "/api/captcha?";
const view = () => {
  const dispatch = useDispatch();

  let navigateTo = useNavigate();
  // 加载完这个组件之后，加载背景
  useEffect(() => {
    initLoginBg();
    window.onresize = function () {
      initLoginBg();
    };

    // getCaptchaImg();
  }, []);
  // 获取用户输入的信息
  const [usernameVal, setUsernameVal] = useState(""); // 定义用户输入用户名这个变量
  const [passwordVal, setPasswordVal] = useState(""); // 定义用户输入密码这个变量
  const [captchaVal, setCaptchaVal] = useState(""); // 定义用户输入验证码这个变量
  // 定义一个变量保存验证码图片信息
  const [captchaImg, setCaptchaImg] = useState("");

  const usernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 获取用户输入的用户名
    // console.log(e.target.value);
    // 修改usernameVal这个变量为用户输入的那个值。 以后拿到usernameVal这个变量就相当于拿到用户输入的信息。
    setUsernameVal(e.target.value);
  };
  const passwordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordVal(e.target.value);
  };
  const captchaChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCaptchaVal(e.target.value);
  };
  // 点击登录按钮的事件函数
  const gotoLogin = async () => {
    console.log(
      // "用户输入的用户名，密码，验证码分别是：",
      usernameVal,
      passwordVal,
      captchaVal
    );
    // 验证是否有空值
    if (!usernameVal.trim() || !passwordVal.trim() || !captchaVal.trim()) {
      message.warning("请完整输入信息！");
      return;
    }
    // 发起登录请求
    let loginAPIRes = await LoginAPI({
      userName: usernameVal,
      password: passwordVal,
      code: captchaVal,
    });
    if (loginAPIRes.code === 200) {
      // 1、提示登录成功
      message.success("登录成功！");
      // 2、保存token
      localStorage.setItem("token", loginAPIRes.data.token);
      // 将token存到react-redux
      const changeNum = () => {
        // dispatch({type:"字符串(认为是一个记号)",val:3})   type是固定的  val是自定义的
        // dispatch({type:"add1"})
        dispatch({ type: "setToken", val: loginAPIRes.data.token }); // 触发了reducer函数的执行
      };
      // 3、跳转到/page1
      navigateTo("/");
      // 4、删除本地保存中的uuid
    }
  };

  // 点击验证码图片盒子的事件函数
  const getCaptchaImg = async () => {
    // 做验证码的请求
    // CaptchaAPI().then((res)=>{
    //   console.log(res);
    // })
    let captchaAPIRes = await CaptchaAPI();
    console.log(captchaAPIRes);
    setCaptchaImg(captchaAPIRes);
  };
  return (
    <div className={styles.loginPage}>
      {/* 存放背景 */}
      <canvas id="canvas" style={{ display: "block" }}></canvas>
      {/* 登录盒子 */}
      <div className={styles.loginBox + " loginbox"}>
        {/* 标题部分 */}
        <div className={styles.title}>
          <h1>前端乐哥&nbsp;·&nbsp;通用后台系统</h1>
          <p>Strive Everyday</p>
        </div>
        {/* 表单部分 */}
        <div className="form">
          <Space direction="vertical" size="large" style={{ display: "flex" }}>
            <Input placeholder="用户名" onChange={usernameChange} />
            <Input.Password placeholder="密码" onChange={passwordChange} />
            {/* 验证码盒子 */}
            <div className="captchaBox">
              <Input placeholder="验证码" onChange={captchaChange} />
              <div className="captchaImg" onClick={getCaptchaImg}>
                {/* <img style={{ height: 38, width: 200 }} src={imgUrl} alt="" /> */}
                <img src={"http://localhost:8088/api/captcha?"} alt="" />
              </div>
            </div>
            <Button
              type="primary"
              className="loginBtn"
              block
              onClick={gotoLogin}
            >
              登录
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};
export default view;
