import { CircularProgress } from "@mui/material";
import Images from "../components/gallery/grid/Images";
import useScroll from "../components/hooks/useScroll";
import useFetch from "../components/hooks/useFetch";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function Gallery({ response }) {
  const [isloading, setisloading] = useState(false);
  const [list, setlist] = useState([]);
  const used = useRef(null);
  const [scrollposition, hit] = useScroll();
  const result = JSON.parse(response).result;

  useEffect(() => {
    if (!used.current) {
      setlist([...list, ...result]);
      used.current = 1;
    }
  });
  const getMore = async () => {
    setisloading(true);
    const url = `https://fervencciD.onrender.com/api/v1/catalogs?limit=10`;

    const data = await axios.get(url);

    const arr = data.data.data;
    setlist([...list, ...arr]);
    setisloading(false);
  };
  useEffect(() => {
    if (hit == true) {
      getMore();
    }
  }, [hit]);

  return (
    <div className='relative'>
      <Images array={list} />
      <div className='w-full flex justify-center items-center'>
        {isloading && <CircularProgress />}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const url = `https://fervencciD.onrender.com/api/v1/catalogs?limit=10`;
  const response = {};
  console.log("first");
  try {
    const data = await axios.get(url);

    response.result = data.data.data;
  } catch (error) {
    response.error = error;
  }
  console.log(response, "res");
  if (!response.error) {
    return {
      props: {
        response: JSON.stringify(response),
      },
    };
  }
  return {
    notFound: true,
  };
}
