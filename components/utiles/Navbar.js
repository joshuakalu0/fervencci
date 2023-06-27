import Image from "next/image";
import Backend from "./header/Backend";
import Frontend from "./header/Frontend";
import Searchinput from "./Search";
import Link from "next/link";
export default function Navbar({ type }) {
  return (
    <nav className='nav-font flex sticky top-0 shadow-md z-10 nav-color'>
      {/* section one - logo */}
      <div className='flex items-center justify-between space-x-auto w-full'>
        <div className='flex items-center justify-between flex-grow'>
          <Link href='/'>
            <a className='p-2 px-4'>
              <Image src='/client-2.png' width={50} height={28} />
            </a>
          </Link>
          {type == "user" && <Searchinput />}
        </div>

        {type == "user" && <Frontend />}
        {/* {type == "admin" && <Backend />} */}
      </div>
    </nav>
  );
}
