import axios from "axios";
import { useField, useFormikContext } from "formik";
import { useEffect, useRef, useState } from "react";
import Close from "../svg/Close";
import Upload from "../svg/Upload";
import Searchresult from "./Searchresult";

export default function Imagefetch({ setter, data }) {
  const [search, setsearch] = useState(null);
  const [searchresult, setsearchresult] = useState([]);
  const [issearching, setissearching] = useState(false);
  const [timeout, settimeout] = useState("");
  const [displayimage, setdisplayimage] = useState(null);
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(data);

  const userref = useRef(null);
  const field_name = data.name;
  useEffect(() => {
    if (field.value.length != 0) {
      setdisplayimage(field.value[0].toString());
    }
    if (displayimage) {
      setFieldValue(field_name, displayimage);
    }
  }, [displayimage]);

  useEffect(() => {
    if (search) {
      clearTimeout(timeout);
      const ty = setTimeout(() => {
        fet(search, setsearchresult);
        console.log(search, "j");
        if (search === "") {
          setissearching(false);
          return;
        }
      }, 1000);
      settimeout(ty);
    }
  }, [search]);

  function handlesearch(ev) {
    setissearching(true);
    const text = ev.target.value;
    if (text === "") {
      setissearching(false);
    }
    setsearch(text);
  }
  function handleinputchange(ev) {
    let reader = new FileReader();
    reader.readAsDataURL(ev.target.files[0]);
    reader.onload = (data) => {
      let Imgdata = reader.result;
      // userref.current.src = Imgdata;
      setFieldValue(field_name, Imgdata);
    };
  }

  return (
    <div className='w-[300px] max-w-[300px] flex flex-col space-y-1 max-h-[175px] mx-1 border-[1px] rounded-md border-black'>
      <div className='flex relative justify-center items-center rounded-md bg-slate-400 m-1 border-[1px]  h-[20%] flex py-1 '>
        <input
          type='text'
          placeholder='search for design'
          value={search || ""}
          onChange={handlesearch}
          className='h-full  flex flex-grow bg-transparent text-black placeholder:text-gray-700 pl-1 rounded-md outline-none'
        />
        <div
          className='pr-1 h-1/3 w-auto flex flex-row justify-center items-center '
          onClick={() => userref.current.click()}
        >
          <input
            type='file'
            onChange={handleinputchange}
            ref={userref}
            multiple
            hidden
          />
          <Upload />
        </div>
        {issearching && (
          <div className='h-auto space-y-1 max-h-[400px] overflow-scroll scrollbar-hide flex-col w-full absolute bg-black z-10 p-1 top-[140%] rounded-md left-0'>
            <div className='px-3'>
              <small className='text-gray-300'>
                result loading...{searchresult.length}
              </small>
            </div>
            {/* start */}
            {searchresult.length}
            {searchresult.length != 0 && (
              <Searchresult
                list={searchresult}
                setdisplay={setdisplayimage}
                setsearch={setsearch}
                issearching={setissearching}
              />
            )}

            {/* stop */}
          </div>
        )}
      </div>
      {displayimage && (
        <div className='h-2/3 w-full relative'>
          <img
            onClick={(ev) => setter({ list: [ev.target.src] })}
            src={`${displayimage}`}
            className='w-full object-cover rounded-md max-h-[120px]'
          />
          <Close click={() => setdisplayimage(null)} />
        </div>
      )}
    </div>
  );
}

function fet(params, fun) {
  let array = ["design_name", "thumbnail"];
  let body = array.join(",");
  let url = `https://fervencciD.onrender.com/api/v1/catalogs?searchBy=design_name,${params}&fields=${body}`;
  axios
    .get(url, body)
    .then((axiosdata) => {
      console.log(axiosdata.data);
      fun([...axiosdata.data.data]);
    })
    .catch((err) => {
      console.log(err);
    });
}
