import React, {useEffect, useState} from "react";
import {Table, Tag, Space, notification} from "antd";
import Avatar from "antd/lib/avatar/avatar";
import {hostname} from "./config";
import {getAllUserImages} from "./actions/uploadImages";
import SimpleMap from "./simpleMap";

export default function ImageTableView() {
  const [fileList, setFileList] = useState([]);
  const [mapData, setMapData] = useState([]);

  useEffect(() => {
    const data = {};
    getAllUserImages(data, (res) => {
      notification.success({message: "All images retrieved successfully!"});
      const newFetchedData = res?.data?.imagesWithLocation?.map((image) => ({
        name: image?.originalName,
        uid: image?.id,
        url: hostname() + image?.attachment,
        height: image?.height,
        width: image?.width,
        size: image?.size,
        location: image?.location,
        userName: image?.userName,
        imageLocation: image?.imageLocation,
      }));
      setFileList(newFetchedData);
    });
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <>
          <Avatar src={record?.url} />
          <p style={{paddingLeft: "5px"}}>{text}</p>
        </>
      ),
    },
    {
      title: "Username",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Width",
      dataIndex: "width",
      key: "width",
    },
    {
      title: "Height",
      key: "height",
      dataIndex: "height",
    },
    {
      title: "Location",
      key: "location",
      dataIndex: "imageLocation",
      render: (location) => {
        return (
          <>
            <Tag color="green" key={1}>
              {location?.lat}
            </Tag>
            <Tag color="volcano" key={2}>
              {location?.lang}
            </Tag>
          </>
        );
      },
    },
    {
      title: "Size",
      key: "size",
      dataIndex: "size",
      render: (size) => {
        //   size=0.0009765625*size
        let color = size > 5 ? "geekblue" : "green";
        if (size > 2 && size < 5) {
          color = "volcano";
        }
        return (
          <Tag color={color} key={size}>
            {size} kb
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <p
            style={{color: "blue", cursor: "pointer"}}
            onClick={() => {
              setMapData(record);
            }}
          >
            View in Map
          </p>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={fileList} />
      {mapData && <SimpleMap mapData={mapData} />}
    </div>
  );
}
