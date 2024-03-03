import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { app } from "../context/Firebase";
import { useFirebase } from "../context/Firebase";
import { MdEdit, MdDelete } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Home = () => {
  const { placeOrder, getBooksData, user, isLoggedIn, deleteBooksById } =
    useFirebase();

  const [books, setbooks] = useState([]);

  const [bookQnty, setBookQnty] = useState(1);

  useEffect(() => {
    getBooksData().then((data) => setbooks(data.docs));
  }, []);

  return (
    <div className="container w-[80vw]  mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">All Books</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((item, index) => (
          <div key={index} className=" bg-white rounded-lg shadow-md p-6">
            <div className=" float-right z-30 flex gap-1  ">
              <button className="font-medium bg-gray-200 p-1 rounded-lg  text-blue-600">
                <MdEdit />
              </button>
              <button
                onClick={() => deleteBooksById(item.id)}
                className="font-medium bg-gray-200 p-1 rounded-lg  text-red-600"
              >
                <MdDelete />
              </button>
            </div>
            <img
              className="w-32 h-32 mx-auto mb-4"
              src={item.data().cover}
              alt="Book Cover"
            />
            <h2 className="text-xl font-semibold mb-2">
              {item.data().bookName}
            </h2>
            <Link to={`/view/${item.id}`}>
              <p className="text-gray-700 mb-2 cursor-pointer">
                {item.data().aboutBook.substr(0, 150)}...
              </p>
            </Link>
            <p className="flex text-xl font-medium items-center my-3 ">
              <FaRupeeSign />
              {item.data().bookPrice}
            </p>
            <input
              type="number"
              placeholder="enter any qnty"
              onChange={(e) => setBookQnty(e.target.value)}
              className="pl-2 p-1 m-2 border border-green-400 outline-none"
            />
            <button
              onClick={() =>
                placeOrder(
                  item.id,
                  item.data().bookName,
                  item.data().cover,
                  bookQnty
                )
              }
              className="mb-3 bg-green-500 py-1 px-2 text-slate-50 rounded-md shadow-md"
            >
              Buy Now
            </button>
            <div className=" flex  justify-start items-center   ">
              {item.data().userPic ? (
                <img
                  className="w-10 h-10 rounded-full mr-2"
                  src={item.data().userPic}
                  alt="Author"
                />
              ) : (
                <img
                  className="w-10 h-10 rounded-full mr-2"
                  src="https://cdn4.vectorstock.com/i/1000x1000/06/18/male-avatar-profile-picture-vector-10210618.jpg"
                  alt="Author"
                />
              )}

              <div className=" flex flex-col justify-center items-start">
                <span className="text-md font-medium text-slate-700">
                  {item.data().userName}
                </span>
                <span className="text-sm font-medium text-slate-600">
                  {item.data().userEmail}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
