import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import Filter from "../components/gallery/Filter";
import Images from "../components/gallery/grid/Images";
import { useRouter } from "next/router";
import useScroll from "../components/hooks/useScroll";
import useSplitarray from "../components/hooks/useSplitarray";
import Navbar from "../components/utiles/Navbar";
import useFetch from "../components/hooks/useFetch";
import axios from "axios";
export default function Gallery({ catalogs }) {
  const record = JSON.parse(catalogs);
  const route = useRouter();
  const [isloading, setisloading] = useState(false);
  const [watch, setwatch] = useState({
    first: [],
    second: [],
    third: [],
    fourth: [],
  });
  const [loaded, setloaded] = useState(0);
  const [scrollposition, hit] = useScroll();
  const [splitter] = useSplitarray(setwatch, watch);
  const url = `https://fervencciD.onrender.com/api/v1/catalog?page=2&limit=10`;

  const [result, setpage, seturl] = useFetch(url, isloading);

  useEffect(() => {
    splitter(record);
  }, [result]);
  useEffect(() => {
    console.log(watch);
  }, [watch]);
  useEffect(() => {
    if (hit == true) {
      splitter(result);
      setisloading(true);
    }
  }, [hit]);

  return (
    <div className='relative'>
      {/* <Filter /> */}
      <Images array={watch} />
      <div className='w-full flex justify-center items-center'>
        {isloading && <CircularProgress />}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const url = `https://fervencciD.onrender.com/api/v1/catalog?limit=10`;
  try {
    const catalog = await axios.get(url);
    console.log(catalog, "d");
    return {
      props: {
        catalogs: JSON.stringify(catalog),
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
}
