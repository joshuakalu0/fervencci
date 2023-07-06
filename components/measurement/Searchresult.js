export default function Searchresult({
  list,
  setdisplay,
  setsearch,
  issearching,
}) {
  function handleclick(data) {
    setdisplay(data.thumbnail[0]);
    setsearch("");
    issearching(false);
  }
  return list.map((data, id) => {
    return (
      <div
        onClick={() => handleclick(data)}
        key={id}
        className='p-1 flex rounded-md border-green-600 flex-row justify-between items-center w-full border-[1px]'
      >
        <div className='flex justify-end text-gray-500'>
          <p>{data.design_name}</p>
        </div>
        <div className='flex justify-end'>
          <img
            src={`${data.thumbnail[0]}`}
            alt={`${data.thumbnail[0]}`}
            className='w-full max-w-[70px] object-cover rounded-md h-full'
          />
        </div>
      </div>
    );
  });
}
