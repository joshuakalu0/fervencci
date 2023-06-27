import { useEffect, useState } from "react";
import useSideScroll from "./useSideScroll";

export default function useSplitarray(setter, mainlist) {
  const store = [];
  const [word, count, changed] = useSideScroll();
  // useEffect(() => {
  //   Object.keys(mainlist).map

  // }, [count])
  useEffect(() => {
    if (changed === true) {
      const newlist = [];
      Object.values(mainlist).forEach((designs) => {
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
      mainlist.first = [...mainlist.first, ...array];

      setter((watch) => {
        return {
          first: [...(watch?.first || []), ...array],
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
      mainlist.first = [...mainlist.first, ...tempfirst];
      mainlist.second = [...mainlist.second, ...tempsecond];
      mainlist.third = [...mainlist.third, ...tempthird];
    }
    if (word === "lg") {
      let tempfirst = array.splice(0, eachCount);
      let tempsecond = array.splice(0, eachCount);
      let tempthird = array.splice(0, eachCount);
      let tempfourth = array.splice(0, eachCount);
      if (array.length > 0) {
        store.splice(0, 0, ...array);
      }
      mainlist.first = [...mainlist.first, ...tempfirst];
      mainlist.second = [...mainlist.second, ...tempsecond];
      mainlist.third = [...mainlist.third, ...tempthird];
      mainlist.fourth = [...mainlist.fourth, ...tempfourth];
    }
  }
  return [splitter];
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
  //   setter((watch) => {
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
