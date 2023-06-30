import axios from "axios";
import storage from "../../firebase";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
// uuidv4();
export default function useFetchUpload(setissubmitting, setupload) {
  const images = [];
  const detail = {};
  const ro = useRouter();

  const makeRequest = async (formdata, values) => {
    images.splice(0, images.length - 1);
    detail.formdata = formdata;
    detail.url = formdata.url;
    detail.values = values;
    detail.images = values?.photos || [];
    detail.image_num = values.photos?.length || 0;
    const uuid = formdata.uuid === null ? uuidv4() : formdata.uuid;
    if (formdata.uuid === null) {
      detail.values.uuid = uuid;
    }
    postImage(values.photos, formdata, uuid);
  };

  async function postImage(list, formdata, uuid) {
    const length = list?.length;
    // console.log(detail?.values);
    list?.forEach(async (image, id) => {
      let temp = image.slice(0, 10);
      if (temp === "data:image") {
        const storageRef = ref(storage, `${formdata.page}/${uuid}/${id}.jpg`);
        uploadString(storageRef, image, "data_url")
          .then((snapshot) => {
            getDownloadURL(snapshot.ref)
              .then((downloadURL) => {
                handleimg({ image_url: downloadURL, id, formdata });
                console.log(downloadURL);
              })
              .catch((error) => {
                console.log("error");
              });
          })
          .catch((err) => {
            console.log(err, "upload error");
          });
      } else {
        handleimg({ image_url: image, id, formdata });
        return;
      }
    });
  }

  async function handleimg(obj) {
    console.log("handle img", obj);
    const { image_url, id, formdata } = obj;
    // const url = `/api/actions/edit?target=${detail?.formdata?.page}`;
    images.push(image_url);

    const body = {
      ...detail?.values,
    };
    console.log(images.length, "to", detail?.image_num);
    if (images.length === detail?.image_num) {
      body.photos = images;
      let request = null;

      try {
        console.log(body, "values");
        if (formdata.action === "edit") {
          console.log(formdata.action);
          request = await axios.patch(formdata.url, {
            id: detail.formdata?.id,
            body,
          });
        } else if (formdata.action === "create") {
          request = await axios.post(formdata.url, body);
        }
        console.log("success");
        const responsedata = request?.data?.data?._id;

        ro.push(`/dashboard/view/${detail.page}/${responsedata}`);
      } catch (error) {
        feedback("failed", error);
      }
    }
  }
  async function feedback(status, data) {
    setupload({
      status,
      data,
    });

    setissubmitting(false);
  }
  return [makeRequest];
}
