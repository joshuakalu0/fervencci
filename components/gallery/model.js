import { useState, useRef } from "react";
import MiniImage from "./MiniImage";
import Modelfull from "./Modelfull";

export default function Model({ data }) {
  const [active, setactive] = useState(true);
  const big = useRef(null);
  const small = useRef(null);
  function handleclick(ev, act) {
    if (act == "close") {
      big.current.classList.remove("big-img-active");
      small.current.classList.remove("small-img-active");
      let time = setTimeout(() => {
        setactive(true);
        clearTimeout(time);
      }, 1000);
    } else if (act == "open") {
      setactive(false);
      let time = setTimeout(() => {
        small.current.classList.add("small-img-active");
        big.current.classList.add("big-img-active");
      }, 10);
    }
  }

  return (
    // <div className='main-img'>
    <div>
      <MiniImage fun={handleclick} data={data} linkref={small} />
      <Modelfull fun={handleclick} result={data} bool={active} linkref={big} />
    </div>
  );
}
