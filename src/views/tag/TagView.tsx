import React from "react";
import { Space, Table, Tag } from "antd";
import * as dayjs from "dayjs";
const { Column, ColumnGroup } = Table;
import { AllTagApi, UploadTagApi } from "@/request/api";
import "./index.scss";
import { useState, useEffect } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { ColumnsType } from "antd/lib/table";
export default function TagView() {
  let [tagList, setTagList] = useState(Array<tagRes>);
  useEffect(() => {
    AllTagApi().then((res) => {
      setTagList(res.data);
    });
  }, []);

  const onFinish = (values: any) => {
    UploadTagApi(values).then((res) => {
      AllTagApi().then((res) => {
        setTagList(res.data);
      });
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const columns: ColumnsType<tagRes> = [
    {
      title: "名称",
      dataIndex: "tagName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "icon",
      dataIndex: "icon",
      render: (text) => <div dangerouslySetInnerHTML={{ __html: text }} />,
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      render: (_, { createTime }) => {
        return <div>{dayjs(createTime).format("YYYY/MM/DD/HH")}</div>;
      },
    },
    // 操作
    {
      title: "操作",
      key: "index",
      dataIndex: "",
      render: (_, text) => {
        return (
          <div>
            <Button danger>删除</Button>
          </div>
        );
      },
    },
  ];

  return (
    // 标签列表
    <div className="tag-box">
      {/* 表单 */}
      <Table
        columns={columns}
        dataSource={tagList}
        rowKey={(record) => record.id}
      />
      ;
      <div className="form-data">
        <Form
          name="basic"
          className="form"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ width: 600 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="标签名"
            name="tagName"
            rules={[{ required: true, message: "请输入您的标签名" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="图标(svg)"
            name="icon"
            rules={[{ required: true, message: "请输入您的图标" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              发布
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
