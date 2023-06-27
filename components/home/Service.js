export default function Service({ aim }) {
  return (
    <div>
      <div className='flex flex-col justify-end relative  p-2 text-lg bg-orange-200 border-2 border-white-300 m-3 '>
        <h3 className='heaser-font text-3xl font-bold text-lg left py-3'>
          Our service
        </h3>
        <p className='font-test text-xl'>{aim}</p>
      </div>
    </div>
  );
}
