import {Link} from 'react-router-dom'

export default function NavBar() 
{
  return (
    <header className="px-[2rem] py-[1rem] bg-primary text-white">
      <nav className="flex mx-auto my-0 w-[100rem] max-w-[100%]">
        <Link to='/' className="capitalize font-bold text-[2rem] text-white">
          cooking but fancy
        </Link>
        <ul className="ml-auto flex gap-[2.5rem]">
          <li className="flex items-center gap-[1rem]">
            <label htmlFor="search">Search:</label>
            <input
              className="rounded-[.3rem] py-[.5rem] px-[.7rem] text-black"
              type="text"
            />
          </li>
          <li>
            <Link to='/new' className="capitalize rounded-[.3rem] text-[1.3rem] block border-[1px] border-white py-[.5rem] px-[.8rem]">
              create recipe
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
