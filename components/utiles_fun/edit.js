import axios from "axios";
import storage from "../../firebase";
import { ref, uploadString, getDownloadURL } from "firebase/storage";

export const makeRequest = async (formdata, values) => {
  trigger();
  const page = getImageField(formdata.page);
  if (formdata.action === "create") {
    if (formdata.page != "report" && values[page].length != 0) {
      getID(formdata, values, true);
    } else {
      getID(formdata, values, false);
    }
    return;
  }
  const url = `/api/actions/edit?target=${formdata.page}`;
  const opt = {
    url,
    id: formdata.id,
    body: values,
    page,
  };
  postImage(values[page], formdata, opt);

  //   console.log(img, "img");
  //   values[page] = await img;
  const body = {
    body: await values,
    data_id: formdata.id,
  };
  // let res;
  // let resid;
  // try {
  //   res = await axios.post(url, body);
  //   resid = await res.data.data._id;
  // } catch (error) {
  //   res = await error;
  // }
  // console.log(res, "res");
  // return { res, resid };
};
async function postImage(list, formdata, opt) {
  const length = list.length;
  list.forEach(async (image, id) => {
    let temp = image.slice(0, 10);
    if (temp === "data:image") {
      const storageRef = ref(
        storage,
        `${formdata.page}/${formdata.id}/${id}.jpg`
      );
      uploadString(storageRef, image, "data_url").then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          console.log(downloadURL, "u");
          const c_event = new CustomEvent("imgReady", {
            bubbles: true,
            detail: {
              image_url: downloadURL,
              length,
              id,
              opt,
            },
          });
          dispatchEvent(c_event);
        });
      });
      //   .catch(err=>console.log(err,'fe'));
    } else {
      const event = new CustomEvent("imgReady", {
        bubbles: true,
        detail: {
          image_url: image,
          length,
          id,
          opt,
        },
      });
      dispatchEvent(event);
      //   return image;
    }
  });
}
function getImageField(page) {
  switch (page) {
    case "user":
      return "profile_pic";
      break;
    case "catalog":
    case "measurement":
      return "images";
      break;
  }
}

const getID = async (formdata, values, recall) => {
  let url = `/api/actions/create?target=${formdata.page}`;
  let fieldOne;
  fieldOne = getImageField(formdata.page);

  let image = values[fieldOne];
  values[fieldOne] = [""];
  let res;
  let resid;
  try {
    res = await axios.post(url, values);
    resid = await res.data.data._id;
  } catch (error) {
    res = await error;
  }
  console.log(res, resid, "re");
  formdata.id = resid;
  formdata.action = "edit";
  values[fieldOne] = image;
  if (recall === true) {
    makeRequest(formdata, values);
  }
};
const images = [];
function trigger() {
  addEventListener("imgready", async (ev) => {
    console.log("first");
    const { image_url, length, id } = ev.detail;
    const { url, data_id, body, page } = ev.detail.opt;
    images.push(image_url);
    if (length - 1 === id) {
      body[page] = images;
      let res;
      let resid;
      try {
        res = await axios.post(url, { id: data_id, body });
        resid = await res.data.data._id;
        const event = new CustomEvent("upload-success", {
          bubbles: true,
          detail: {
            res,
            resid,
          },
        });
        dispatchEvent(event);
      } catch (error) {
        const event = new CustomEvent("upload-failed", {
          bubbles: true,
          detail: {
            res,
            resid,
          },
        });
        dispatchEvent(event);
      }
      console.log(res, "res");
    }
  });
}

// if (formdata.action == "edit") {
//     let url = `/api/actions/edit?target=${formdata.page}`;
//     let body = {
//       id: formdata.id,
//       body: values,
//     };
//     axios
//       .patch(url, body)
//       .then((axiosdata) => {
//         let id = axiosdata.data.data._id;
//         ro.push(`?view=${target}&id=${id}`);
//         console.log(axiosdata);
//         setissubmitting(false);
//       })
//       .catch((err) => {
//         setissubmitting(false);
//         G_setter((obj) => {
//           return { ...obj, Error: [err.response.data] };
//         });
//       });
//   } else if (formdata.action == "create") {
//     let url = `/api/actions/create?target=${formdata.page}`;
//     axios
//       .post(url, values)
//       .then((axiosdata) => {
//         console.log(axiosdata);
//         ro.push(`?view=${target}&id=${axiosdata.data.data._id}`);
//         setissubmitting(false);
//       })
//       .catch((err) => {
//         console.log(err)
//         setissubmitting(false);
//         G_setter((obj) => {
//           return { ...obj, Error: [err.response.data] };
//         });
//       });
//   }
