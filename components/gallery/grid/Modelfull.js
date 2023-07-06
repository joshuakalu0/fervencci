import { Button } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import Carosue from "../utiles_fun/carosue";

const arr = [2, 18, 17, 1];
export default function Modelfull({ fun, bool, linkref }) {
  const [data, setdata] = useState("");
  const [start, setstart] = useState();
  const [stop, setstop] = useState(0);
  const handler = new Carosue(arr, setdata, setstop);
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
              <h3>header</h3>
            </div>
            <div>
              <Button>order</Button>
              <Button onClick={(ev) => fun(ev, "close")} color='error'>
                close
              </Button>
            </div>

            {/* image section */}
          </div>
          <div className='flex flex-col md:flex-row space-x-2'>
            <div className='model-image-wrapper md:flex-grow'>
              <div className='model-images space-y-1'>
                {arr.map((innerdata, i) => {
                  return (
                    <div key={i}>
                      <img
                        src={`./img/1 (${innerdata}).jpg`}
                        className='model-main-image '
                      />
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
                  src={`./img/1 (${data || arr[0]}).jpg`}
                  className='model-main-image '
                />
              </div>
            </div>
            <div className='model-description md:w-[30%]'>
              <div className='model-des-header'>
                <h3>description</h3>
              </div>
              <div className='model-des-body'>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed,
                  dolorum repudiandae amet aut tempore ullam odio, laboriosam
                  iusto, alias incidunt reiciendis rem sint impedit! At
                  doloribus provident repellendus voluptatem dolorem?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
