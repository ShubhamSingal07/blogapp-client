import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const username = JSON.parse(localStorage.getItem('user'))?.username;

  const logoutUser = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav
      className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 shadow-md"
      style={{ bacgroundColor: 'whitesmoke' }}>
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <div className="hidden w-full md:block md:w-auto ml-auto" id="navbar-default">
          <ul className="flex flex-col p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li>
              <NavLink
                to="/"
                className="block py-2 pr-4 pl-3 text-md text-bold text-black rounded md:p-0"
                aria-current="page">
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/me"
                className="block py-2 pr-4 pl-3 text-md text-bold text-black rounded md:p-0"
                aria-current="page">
                My Articles
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/article/write"
                className="block py-2 pr-4 pl-3 text-md text-bold text-black rounded md:p-0"
                aria-current="page">
                Write
              </NavLink>
            </li>

            {!username && (
              <li>
                <NavLink
                  to="/login"
                  className="block py-2 pr-4 pl-3 text-md text-bold text-black rounded md:p-0"
                  aria-current="page">
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>

        <div>
          {username && (
            <>
              <button
                type="button"
                data-dropdown-toggle="language-dropdown-menu"
                onClick={() => setOpen(prevVal => !prevVal)}
                className="inline-flex justify-center items-center p-2 text-md rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100">
                <img
                  className="w-6 h-6 rounded-full mr-1"
                  src="/images/user.png"
                  alt="Avatar of Jonathan Reinink"
                />
                {username}
              </button>

              <div
                className={`${
                  !open && 'hidden'
                } absolute z-50 my-2 text-base list-none bg-white rounded divide-y divide-gray-100 shadow-md`}
                id="language-dropdown-menu">
                <ul className="py-1" role="none">
                  <li>
                    <span
                      onClick={logoutUser}
                      className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem">
                      <div className="inline-flex items-center">Logout</div>
                    </span>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
