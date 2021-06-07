import React, { useEffect, useState } from "react";
import axios from "axios";
import { Upload, Modal, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getAllUserImages } from "./actions/uploadImages";
import { hostname } from "./config";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const ImageGallary = () => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-2",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-3",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-4",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-xxx",
      percent: 50,
      name: "image.png",
      status: "uploading",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-5",
      name: "image.png",
      status: "error",
    },
  ]);

  useEffect(() => {
    const data = {};
    getAllUserImages(data, (res) => {
      notification.success({ message: "All images retrieved successfully!" });
      const newFetchedData = res?.data?.imagesWithLocation?.map((image) => ({
        name: image?.originalname,
        uid: image?.id,
        url: hostname() + image?.attachment,
        height: image?.height,
        width: image?.width,
        location: image?.location,
        userName: image?.userName,
      }));
      setFileList(newFetchedData);
    });
  }, []);

  const handleCancel = () => setPreviewVisible(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewVisible(true);
    setPreviewImage(file.url || file.preview);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = async ({ fileList, file }) => {
    navigator.geolocation.getCurrentPosition(function (position) {
    let  lat = position.coords.latitude;
     let lang = position.coords.longitude;

      //  getCurrentAddress(lat,lang).then((address)=>{
      //   console.log("addres after getting lang is here",address);
      //   })

      let metadata = {
        attachmentType: "image",
        userInfo: {
          userName: "RaviBeniwal",
          location: { lat: lat, lang: lang },
        },
      };

      const url = hostname() + "/files/uploadImage";
      const formData = new FormData();
      formData.append("file", file.originFileObj);
      formData.append("param", JSON.stringify(metadata));
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      axios
        .post(url, formData, config)
        .then(() => {
          const data = {};
          setTimeout(() => {
            getAllUserImages(data, (images) => {
              fileList[fileList?.length - 1].status = "done";
              setFileList(fileList);
              notification.success({
                message: "Photo Uploaded Successfully",
              });
            });
          }, 1000);
        })
        .catch((err) => {
          notification.error({
            message: `Photos were not uploaded due to ${err}`,
          });
        });
    });
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }} onChange={handleChange}>
        Upload New Image
      </div>
    </div>
  );
  return (
    <>
    <h1 style={{padding:'20px 10px'}}>Upload new image in gallery</h1>
      <Upload
        listType="picture-card"
        fileList={fileList}
        showUploadList={{ showRemoveIcon: false }}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={() => {}}
      >
        {uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default ImageGallary;
