import { CircularProgress } from "@mui/material";
// import { useEffect, useState } from "react";
import Images from "../components/gallery/grid/Images";
// import useScroll from "../components/hooks/useScroll";
import useSplitarray from "../components/hooks/useSplitarray";
// import useFetch from "../components/hooks/useFetch";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Gallery({ response }) {
  if (response?.error) {
    console.log("error");
  }
  //   console.log(response.result);
  const [isloading, setisloading] = useState(false);
  const [splitter, watch] = useSplitarray();
  let used = 0;
  useEffect(() => {
    if (used === 0) {
      const result = JSON.parse(response).result;
      console.log(result, "res");
      splitter(result);
      used = 1;
    }
    if (watch.first.length !== 0) {
      console.log(watch, "watch");
    }
  }, []);

  return (
    <div className='relative'>
      {watch.first.length && <Images array={watch} />}
      <div className='w-full flex justify-center items-center'>
        {isloading && <CircularProgress />}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const url = `https://fervencciD.onrender.com/api/v1/catalogs?limit=10`;
  const response = {};
  try {
    const data = await axios.get(url);

    response.result = data.data.data;
  } catch (error) {
    response.error = error;
  }
  return {
    props: {
      response: JSON.stringify(response),
    },
  };
}
