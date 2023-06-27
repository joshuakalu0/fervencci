export default function Header({ fun }) {
  return (
    <div className='w-full'>
      <div className='w-full flex flex-col justify-center items-center text-justify'>
        <h3 className='header-design-font text-lg text-center md:text-4xl'>
          welcome to fervencci measurement page
        </h3>
        <h4 className='text-md md:text-xl'>
          please read the instruction before filling the form
        </h4>
        <small
          onClick={() => {
            fun((value) => !value);
          }}
          className='cursor-pointer hover:underline text-md md:text-xl'
        >
          click to read instructions
        </small>
      </div>
    </div>
  );
}
