import { useEffect, useState } from "react";
import useSideScroll from "./useSideScroll";

export default function useSplitarray() {
  const store = [];
  const [watch, setwatch] = useState({
    first: [],
    second: [],
    third: [],
    fourth: [],
  });
  const [word, count, changed] = useSideScroll();
  // useEffect(() => {
  //   Object.keys(watch).map

  // }, [count])
  useEffect(() => {
    if (changed === true) {
      const newlist = [];
      Object.values(watch).forEach((designs) => {
        newlist.splice(0, 0, ...designs);
      });
      splitter(newlist);
    }
  }, [word]);

  function splitter(list) {
    const array = [...list];
    if (store.length != 0) {
      array.splice(0, 0, ...store);
    }
    const eachCount = Math.floor(array.length / count);
    if (eachCount < 1) return;
    if (word === "sm") {
      watch.first = [...watch.first, ...array];

      setwatch((watch) => {
        return {
          first: [...(watch?.first || []), ...array],
          second: [],
          third: [],
          fourth: [],
        };
      });
    }
    if (word === "md") {
      console.log("md");
      let tempfirst = array.splice(0, eachCount);
      let tempsecond = array.splice(0, eachCount);
      let tempthird = array.splice(0, eachCount);
      if (array.length > 0) {
        store.splice(0, 0, ...array);
      }
      watch.first = [...watch.first, ...tempfirst];
      watch.second = [...watch.second, ...tempsecond];
      watch.third = [...watch.third, ...tempthird];
      watch.fourth = [];
    }
    if (word === "lg") {
      let tempfirst = array.splice(0, eachCount);
      let tempsecond = array.splice(0, eachCount);
      let tempthird = array.splice(0, eachCount);
      let tempfourth = array.splice(0, eachCount);
      if (array.length > 0) {
        store.splice(0, 0, ...array);
      }
      watch.first = [...watch.first, ...tempfirst];
      watch.second = [...watch.second, ...tempsecond];
      watch.third = [...watch.third, ...tempthird];
      watch.fourth = [...watch.fourth, ...tempfourth];
    }
  }
  return [splitter, watch];
}

{
  // function splitter(list) {
  //   const query = window.matchMedia("(min-width:1536px)");
  //   let divisor = 3;
  //   if (query.matches) {
  //     divisor = 4;
  //   } else {
  //     divisor = 3;
  //   }
  //   let array = [...list];
  //   let center = Math.floor(array.length / divisor);
  //   if (center < 1) return;
  //   let tempfirst = array.splice(0, center);
  //   let tempsecond = array.splice(0, center);
  //   let tempthird = [];
  //   let tempfour = [];
  //   if (query.matches) {
  //     tempthird = array.splice(0, center);
  //     tempfour = array;
  //   } else {
  //     tempthird = array;
  //   }
  //   // let third = array.splice(single_num * 2, single_num + 8);
  //   // let tempthird = array;
  //   setwatch((watch) => {
  //     return {
  //       first: [...watch.first, ...tempfirst],
  //       second: [...watch.second, ...tempsecond],
  //       third: [...watch.third, ...tempthird],
  //       fourth: [...watch.fourth, ...tempfour],
  //     };
  //   });
  //   // setwatch({
  //   //   first: [...watch.first, ...tempfirst],
  //   //   second: [...watch.second, ...tempsecond],
  //   //   third: [...watch.third, ...tempthird],
  //   //   fourth: [...watch.fourth, ...tempfour],
  //   // });
  // }
}
