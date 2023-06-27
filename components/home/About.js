export default function About({ photo, bio }) {
  const img = photo[0]?.toString();

  return (
    <div className='flex justify-end flex-grow  relative w-full md:h-[90vh] '>
      <div className='flex justify-end h-auto md:max-h-[100%] md:min-w-[75%]  w-auto'>
        <img src={img} className='w-[100%] mask h-auto object-cover' />
      </div>
      <div className=' absolute items-end flex justify-end h-1/3 md:h-auto w-full bottom-0 left-0  '>
        <div className='m-auto flex justify-center items-center'>
          <p className='about-text header-font'>about..</p>
        </div>
        <div className='border-[1px] border-black min-w-[40%] max-w-[68%] md:w-1/2 md:h-auto  flex justify-end items-end pr-2'>
          <p className='p-1 text-lg w-auto text-left text-[1rem] overflow-clip'>
            {bio}
          </p>
        </div>
      </div>
    </div>
  );
}
