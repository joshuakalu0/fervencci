import { Button } from "@mui/material";

import Close from "../svg/Close";
import Upload from "../svg/Upload";

export default function InstructionModel({ value, fun }) {
  return (
    <div
      className={`absolute fixed top-[0px] left-[5%] translate-x-[-200%] opacity-0 w-[90%] h-[90%] z-[99] bg-green-600 transition ${
        value && "translate-x-[0%] opacity-100"
      }`}
    >
      <div>
        <div className='h-[30px] bg-transparent flex justify-end items-center w-full'>
          <Close
            click={() => {
              fun(!value);
            }}
          />
        </div>
        <div>
          <div>
            <ul>
              <li>please fill in all the the requried field ( field is *)</li>
              <li className='flex'>
                material <Upload className='inline' />
              </li>
              <li>
                design <Upload />
              </li>
              <li>measurements</li>
              <li>description</li>
            </ul>
          </div>
        </div>
        <div className='absolute bottom-0 right-0'>
          <Button
            onClick={() => {
              fun(!value);
            }}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
