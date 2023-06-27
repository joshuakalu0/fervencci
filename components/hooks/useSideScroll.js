import { useEffect, useState } from "react";

export default function useSideScroll() {
  const [scrollposition, setscrollposition] = useState(null);
  const [changed, setchanged] = useState(false);
  const [size, setsize] = useState([]);

  function handleclickI(ev) {
    setchanged(true);
    setscrollposition(window.innerWidth);
  }
  useEffect(() => {
    setscrollposition(window.innerWidth);
    window.addEventListener("resize", handleclickI);
    return () => {
      window.removeEventListener("resize", handleclickI);
    };
  });
  useEffect(() => {
    if (scrollposition < 950) {
      setsize(["sm", 1]);
    }
    if (scrollposition > 950 && scrollposition < 1536) {
      setsize(["md", 3]);
    }
    if (scrollposition > 1536) {
      setsize(["lg", 4]);
    }
  }, [scrollposition]);
  return [...size, changed];
}
