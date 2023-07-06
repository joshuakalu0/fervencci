import Image from "next/image";
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
            <Image
              src='/client-2.png'
              alt='fervencci-icon'
              width={50}
              height={28}
            />
          </Link>
          {/* {type == "user" && <Searchinput />} */}
        </div>

        <Frontend />
      </div>
    </nav>
  );
}
