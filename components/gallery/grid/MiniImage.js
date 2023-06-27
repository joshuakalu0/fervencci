export default function MiniImage({ fun, data, linkref }) {
  return (
    <div
      ref={linkref}
      className='w-full  max-h-auto sm:max-w-[100%] sm:w-full p-1  h-auto  rounded-md small-img'
      onClick={(ev) => fun(ev, "open")}
    >
      <img
        src={data.thumbnail[0]}
        // src={`./new/1 (${data}).jpg`}
        className='max-w-[100%]  w-full object-cover  h-auto  rounded-sm'
      />
    </div>
  );
}
