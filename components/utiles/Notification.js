import { Close, PushPin } from "@mui/icons-material";
import { useContext, useEffect, useRef, useState } from "react";
import { Globalcontext } from "../../pages/_app3";

export default function Notification() {
  const [object, setter] = useContext(Globalcontext);
  const [isnotification, setisnotification] = useState(false);
  const notifyref = useRef();
  const [n_object, setn_object] = useState({});
  useEffect(() => {
    if (object.Error.length != 0) {
      const temp = {
        type: "notification-error",
        title: object.Error[0].status,
        message: object.Error[0].error,
      };
      notifyref.current.classList.remove("notification-leave");
      setisnotification(true);
      setn_object(temp);
      const t = setTimeout(() => {
        notifyref.current.classList.add("notification-leave");
        reset();
      }, 6000);
    }
    if (object.Success != 0) {
    }
  }, [object]);

  function handleclick() {
    notifyref.current.classList.add("notification-leave");
    reset();
  }
  function reset() {
    setisnotification(false);
    setn_object({});
    setter((obj) => {
      return {
        ...obj,
        Error: [],
        Success: [],
      };
    });
  }
  return (
    <div
      hidden={!isnotification}
      className='fixed min-w-[15%] max-w-[20%] h-auto bg-red-200  top-[75%] right-2'
    >
      <div ref={notifyref} className={`notification-wrapper ${n_object.type}`}>
        <div className='notification-header'>
          <div className='notification-title'>
            <h2>{n_object?.title}</h2>
          </div>
          <div className='notification-actions'>
            <div>
              <PushPin />
            </div>
            <div onClick={handleclick}>
              <Close />
            </div>
          </div>
        </div>
        <div className='notification-message'>{n_object?.message}</div>
      </div>
    </div>
  );
}
5;
