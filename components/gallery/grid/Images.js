import Model from "./model";

export default function Images({ array }) {
  return (
    <div className='grid grid-flow-row-dense sm:grid-flow-col-dense '>
      {Object.values(array).map((ev, i) => {
        if (ev.length === 0) return;
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
