import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import Images from "../components/gallery/grid/Images";
import { useRouter } from "next/router";
import useScroll from "../components/hooks/useScroll";
import useSplitarray from "../components/hooks/useSplitarray";
import useFetch from "../components/hooks/useFetch";
import axios from "axios";

export default function Gallery(props) {
  const record = JSON.parse(props);
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

  // useEffect(() => {
  //   splitter(record);
  // }, [result]);
  // useEffect(() => {
  //   console.log(watch);
  // }, [watch]);
  // useEffect(() => {
  //   if (hit == true) {
  //     splitter(result);
  //     setisloading(true);
  //   }
  // }, [hit]);

  return (
    <div className='relative'>
      {/* <Images array={watch} />
      <div className='w-full flex justify-center items-center'>
        {isloading && <CircularProgress />}
      </div> */}
    </div>
  );
}

export async function getStaticProps() {
  const url = `https://fervencciD.onrender.com/api/v1/catalog?limit=10`;
  return axios
    .get(url)
    .then((res) => {
      const data = res.data;
      return {
        props: {
          data: JSON.stringify(data),
        },
      };
    })
    .catch((err) => {
      console.log(err);
      return {
        props: {
          err: JSON.stringify(err),
        },
      };
    });
}
