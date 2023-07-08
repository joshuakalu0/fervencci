import { Button } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Carosue from "../utiles_fun/carosue";
import Link from "next/link";

const arr = [2, 18, 17, 1];
export default function Modelfull({ fun, result, bool, linkref }) {
  const [data, setdata] = useState("");
  const [start, setstart] = useState();
  const [stop, setstop] = useState(0);
  const handler = new Carosue(result.photos, setdata, setstop);
  function hit() {
    if (!start) {
      let change = handler.start();
    }
    setstart(true);
  }
  useEffect(() => {
    hit();
  }, [data]);

  function handleclick(ev, i) {
    handler.select(i, stop);
  }
  return (
    <div hidden={bool}>
      <div className='model-wrapper big-img ' ref={linkref}>
        <div className='model-inner-wrapper'>
          {/* header section */}
          <div className='model-header'>
            <div>
              <h3>{result.design_name}</h3>
            </div>
            <div>
              {/* <Button>
                <Link href={`measurement/${result._id}`}>request design</Link>
              </Button> */}
              <Button onClick={(ev) => fun(ev, "close")} color='error'>
                close
              </Button>
            </div>

            {/* image section */}
          </div>
          <div className='flex flex-col md:flex-row space-x-2'>
            <div className='model-image-wrapper md:flex-grow'>
              <div className='model-images space-y-1'>
                {result.photos.map((innerdata, i) => {
                  return (
                    <div key={i}>
                      <img src={innerdata} className='model-main-image ' />
                      <span
                        onClick={(ev) => handleclick(ev, i)}
                        className={`image-shadow ${
                          innerdata == data ? "active" : ""
                        }`}
                      ></span>
                    </div>
                  );
                })}
              </div>

              <div className='model-image-showcase'>
                <img
                  src={data || result?.photos[0]}
                  className='model-main-image '
                />
              </div>
            </div>
            <div className='model-description md:w-[30%]'>
              <div className='model-des-header'>
                <h3>description</h3>
              </div>
              <div className='model-des-body'>
                <p>{result.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
