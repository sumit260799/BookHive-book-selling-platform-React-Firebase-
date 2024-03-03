import React from "react";
import { Link } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import { useState } from "react";
const Navbar = () => {
  const { userData, isLoggedIn, signOutUser } = useFirebase();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "AddBooks", href: "/addbooks" },
    {
      name: !isLoggedIn && "login",
      href: !isLoggedIn && "/login",
    },
  ];

  const handleLogout = () => {
    if (isLoggedIn) {
      signOutUser();
    }
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-gray-800 sticky top-0 right-0 left-0 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 text-yellow-500">Firebase</div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) =>
                  item.name === "Logout" ? (
                    <button
                      key={item.name}
                      onClick={handleLogout}
                      className="px-3 py-2 rounded-md text-white text-sm font-medium"
                    >
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.href}
                      className=" px-3 py-2 text-white rounded-md text-sm font-medium"
                    >
                      {item.name}
                    </Link>
                  )
                )}
              </div>
            </div>
            {isLoggedIn && (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center justify-center h-10 w-10 rounded-full bg-white text-gray-800 focus:outline-none"
                  aria-label="User menu"
                >
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                    <div className="flex justify-center px-4 py-2 border-b border-gray-200">
                      <h1 className="text-sm font-medium text-gray-800">
                        {userData && userData.email}
                      </h1>
                    </div>
                    <Link
                      to="/view/mybooks"
                      className=" border-b block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                    >
                      My Books
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-red-800 hover:bg-gray-100 hover:rounded-md w-full text-left"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
