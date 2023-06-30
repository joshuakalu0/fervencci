import axios from "axios";
import { useEffect, useState } from "react";

export default function useFetch(url) {
  const [isQuery, setisQuery] = useState(null);
  const [result, setresult] = useState([]);
  const [urltrack, seturltrack] = useState(url);
  const [page, setpage] = useState(1);
  useEffect(() => {
    const x = url.split("?s");
    if (x.length > 1) {
      setisQuery(true);
    } else {
      setisQuery(false);
    }
  }, [urltrack]);

  useEffect(() => {
    fetcher();
  }, [isQuery, page]);

  function consturl() {
    let temp;
    if (isQuery) {
      temp = `&page=${page}&limit=${10}`;
    } else {
      temp = `?page=${page}&limit=${10}`;
    }

    let tempurl = `${url}${temp}`;
    return tempurl;
  }
  function fetcher() {
    const newurl = consturl();
    axios
      .get(newurl)
      .then((res) => {
        setresult([...result, ...res.data.data]);
        // console.log(res.data.data, "res");
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }
  return [result, setpage, seturltrack];
}
