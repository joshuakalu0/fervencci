import Model from "./model";

export default function Images({ array }) {
  return (
    <div className='grid grid-flow-row-dense sm:grid-flow-col-dense '>
      {Object.values(array).map((ev, i) => {
        return (
          <div key={i} className='w-full  h-full grid grid-row-temp'>
            {ev.map((data, id) => {
              return <Model key={id} data={data} />;
            })}
          </div>
        );
      })}
    </div>
  );
}

{
  /* <div className='flex flex-wrap w-full flex-col sm:flex-row'>
      {Object.values(array).map((ev, i) => {
        return (
          <div
            key={i}
            className='flex w-full sm:w-1/3 sm:flex-col flex-row flex-wrap px-1 '
          >
            {ev.map((data, id) => {
              return <Model key={id} data={data} />;
            })}
          </div>
        );
      })}
    </div> */
}
