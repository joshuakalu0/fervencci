import { useField, useFormikContext } from "formik";
import { useEffect, useRef, useState } from "react";
import Close from "../svg/Close";
import Upload from "../svg/Upload";

export default function FileImage({ setter, data }) {
  const sampleref = useRef(null);
  const imgref = useRef(null);
  const userref = useRef(null);
  const { setFieldValue } = useFormikContext();
  const [isimage, setisimage] = useState(false);
  const [field, meta] = useField(data);
  const field_name = data.name;
  function handlechange(ev) {
    let reader = new FileReader();
    reader.readAsDataURL(ev.target.files[0]);
    reader.onload = (data) => {
      let Imgdata = reader.result;
      setisimage(Imgdata);
      setFieldValue(field_name, Imgdata);
    };
  }
  useEffect(() => {
    if (isimage) {
      imgref.current.src = isimage;
    }
  }, [isimage]);

  function handleremove() {
    imgref.current.src = "";
    setisimage(false);
    setFieldValue(field_name, []);
  }
  return (
    <div className='w-[300px] my-2 md:mx-3 max-w-[300px] flex flex-col space-y-1 max-h-[175px]  border-[1px] rounded-md border-black'>
      <div
        className=' h-7 w-auto flex flex-row w-full border-[1px] rounded-md m-2 justify-center'
        onClick={() => userref.current.click()}
      >
        <input
          type='file'
          ref={userref}
          onChange={(ev) => handlechange(ev)}
          hidden
        />
        <Upload />
        <div className='flex flex-grow justify-start cursor-pointer'>
          <p>sample image</p>
        </div>
      </div>
      {isimage && (
        <div className='h-2/3  w-full relative'>
          <img
            onClick={(ev) => setter({ list: [ev.target.src] })}
            ref={imgref}
            src={``}
            className='w-full object-cover rounded-md max-h-[120px]'
          />
          <Close click={handleremove} />
        </div>
      )}
    </div>
  );
}
