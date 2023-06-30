import { Dehaze } from "@mui/icons-material";
import { Button } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

const Page = [
  ["Home", "/"],
  ["Gallery", "/gallery"],
  ["Measurement", "/measurement"],
];
export default function Frontend() {
  const [isactive, setisactive] = useState(false);
  return (
    <div className='flex justify-end text-center items-center '>
      <div className='hidden sm:flex space-x-2'>
        {Page.map((data, i) => {
          return (
            <Button key={i} color='primary'>
              <Link href={data[1]}>{data[0]}</Link>
            </Button>
          );
        })}
      </div>
      <div className='relative flex justify-end px-6 sm:hidden'>
        <Dehaze onClick={() => setisactive(!isactive)} />
        <div
          className={`absolute opacity-100 flex flex-col top-[50px] left-[-100%] space-y-1 ${
            !isactive && "opacity-0 hidden"
          } `}
        >
          {Page.map((data, i) => {
            return (
              <div key={i} className='w-full p-1 rounded-md bg-teal-300'>
                <Button color='primary' fullWidth>
                  <Link href={data[1]}>{data[0]}</Link>
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
