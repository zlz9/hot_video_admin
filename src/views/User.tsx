import React from "react";
import {
  GetAllUserApi,
  DisableUserApi,
  EnableUserApi,
  resetPwdApi,
} from "@/request/api";
import { useState, useEffect } from "react";
import { Space, Table, Tag, Switch, Button, message } from "antd";
import type { ColumnsType } from "antd/es/table";

export default function User() {
  let [user, setUser] = useState(Array<UserIres>);
  const onChange = (checked: boolean, id: number) => {
    if (!checked) {
      DisableUserApi(id).then((res) => {
        console.log(res.msg);
      });
    } else {
      EnableUserApi(id).then((res) => {
        console.log(res.msg);
      });
    }
  };
  const resetPwd = (id: number) => {
    resetPwdApi(id).then((res) => {
      if (res.code === 200) {
        message.success(`重置密码成功！密码为${res.msg}`);
      }
    });
  };
  const columns: ColumnsType<UserIres> = [
    {
      title: "用户名",
      dataIndex: "userName",
      key: "userName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "昵称",
      dataIndex: "nickName",
      key: "nickName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "头像",
      dataIndex: "avatar",
      key: "avatar",
      render: (text) => <img src={text} alt="" width="50px" height="50px" />,
    },

    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Switch
          checkedChildren="正常"
          unCheckedChildren="禁用"
          defaultChecked={status}
          onChange={(checked) => onChange(checked, record.id)}
        />
      ),
    },
    {
      title: "操作",
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <div>
          <Button danger onClick={(e) => resetPwd(id)}>
            重置密码
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    GetAllUserApi().then((res) => {
      setUser(res.data);
    });
  }, []);
  return (
    <div>
      {/* {user.map((item) => {
        return <div key={item.id}>{item.avatar}</div>;
      })} */}
      <Table
        columns={columns}
        dataSource={user}
        rowKey={(record) => record.id}
      />
      ;
    </div>
  );
}
