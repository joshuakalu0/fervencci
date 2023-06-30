import { useContext } from "react";

import FileClose from "../../svg/FileClose";

export default function FileImages({ images, div, func, active }) {
  const [object, setter] = useContext(Dashboardcontext);
  function handleEnter(ev) {
    let element = ev._targetInst.elementType;
    let event = ev._reactName;
    let short = ev.target.parentElement;
    let parent = element == "img" ? short : short.parentElement;

    if (event == "onMouseEnter") parent.classList.add("close-active");
    if (event == "onMouseLeave") parent.classList.remove("close-active");
  }

  return (
    <div className='file-image-wrapper flex-grow ' ref={div}>
      {images.map((data, i) => {
        return (
          <div className='file-image' key={i}>
            <img
              src={data}
              onMouseLeave={handleEnter}
              onMouseEnter={handleEnter}
              className={`${active == i && "fade"} object-contain`}
            />
            <FileClose handle={handleEnter} func={func} id={i} />
          </div>
        );
      })}
    </div>
  );
}
