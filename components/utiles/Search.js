import { useEffect, useState } from "react";
import { Search } from "@mui/icons-material";
import { useRouter } from "next/router";

export default function Searchinput() {
  const [search, setsearch] = useState(undefined);
  const [issearching, setissearching] = useState(false);
  const [timeout, settimeout] = useState("");
  const route = useRouter();

  const pathname = route.query.next || route.pathname;
  useEffect(() => {
    if (search) {
      clearTimeout(timeout);
      const ty = setTimeout(() => {
        route.push(`/gallery?s=${search}&next=${pathname}`);
        if (search === "") {
          setissearching(false);
          return;
        }
      }, 1000);
      settimeout(ty);
    }
  }, [search, pathname, route, timeout]);

  function handlesearch(ev) {
    setissearching(true);
    const text = ev.target.value;
    if (text === "") {
      route.push(route.query.next);
      setissearching(false);
    }
    setsearch(text);
  }

  return (
    <>
      <div className='flex items-center rounded-full flex-grow bg-gray-200 hover:bg-gray-300'>
        <Search className='p-1 text-[2rem] text-center flex items-center  text-gray-400' />
        <input
          className='flex text-gray-700 z-10 w-full  bg-transparent outline-none placeholder-gray-600 placeholder:text-bold'
          type='text'
          placeholder='search for product...'
          value={search}
          onChange={handlesearch}
        />
      </div>
    </>
  );
}
