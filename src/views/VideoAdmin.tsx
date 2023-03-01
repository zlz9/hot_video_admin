import React from "react";
import * as dayjs from "dayjs";
import { Space, Table, Tag, Button } from "antd";
import { GetAllVideoApi } from "@/request/api";
import { useState, useEffect } from "react";
import type { ColumnsType } from "antd/es/table";
const { Column, ColumnGroup } = Table;
export default function VideoAdmin() {
  const [videoData, setVideoData] = useState<VideoList[]>([]);
  useEffect(() => {
    // 发送请求
    GetAllVideoApi().then((res) => {
      if (res.code === 200) {
        setVideoData(res.data.videoList);
      }
    });
  }, []);
  console.log(videoData);
  const columns: ColumnsType<VideoList> = [
    {
      title: "视频名称",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    // 标签
    {
      title: "标签",
      dataIndex: "tags",
      key: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tags.length > 5 ? "geekblue" : "green";
            return (
              <Tag color={color} key={tag.id}>
                {tag.tagName}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "作者",
      dataIndex: "author",
      key: "author",
      render: (author) => <a>{author.nickName}</a>,
    },
    {
      title: "介绍",
      key: "selfIntroduction",
      dataIndex: "selfIntroduction",
    },
    // 时间
    {
      title: "上传时间",
      key: "createTime",
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

            <Button type="primary" ghost>
              详情
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={videoData}
        rowKey={(record) => record.id}
      />
    </div>
  );
}
