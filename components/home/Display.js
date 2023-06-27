import { Button } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useEffect } from "react";

export default function Display({ catalog }) {
  const [images, setimages] = useState([]);
  const SizeTracker = () => {
    const image = Object.values(catalog).map((item) =>
      item.thumbnail[0].toString()
    );

    if (window.innerWidth < 1088) {
      setimages(image.slice(0, 4));
    }
    if (window.innerWidth >= 1088) {
      setimages(image.slice(0, 6));
    }
    if (window.innerWidth >= 1349) {
      setimages(image.slice(0, 8));
    }
  };
  useEffect(() => {
    SizeTracker();
    window.addEventListener("resize", SizeTracker);

    return () => {
      window.removeEventListener("resize", SizeTracker);
    };
  });

  return (
    <div className='flex flex-col pb-20'>
      <div className='flex w-full justify-end py-3 pr-3'>
        <Link href='/gallery'>
          <Button>see more</Button>
        </Link>
      </div>
      <div className='design-container '>
        {images.map((img, id) => {
          return (
            <div className='w-full px-[1rem]' key={id}>
              <Image
                src={img}
                width='150px'
                height='150px'
                layout='responsive'
                objectFit='cover'
              />
              {/* <img src='./img/1 (16).jpg' className='rounded-md object-cover' /> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}
