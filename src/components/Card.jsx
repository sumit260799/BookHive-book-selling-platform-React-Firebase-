import React from "react";
import { FaRupeeSign } from "react-icons/fa";
import { Link } from "react-router-dom";

const Card = ({ bookId, item }) => {
  return (
    <div className=" bg-white rounded-lg shadow-md p-6">
      <img
        className="w-32 h-32 mx-auto mb-4"
        src={item.data().cover}
        alt="Book Cover"
      />
      <h2 className="text-xl font-semibold mb-2">{item.data().bookName}</h2>
      <Link to={`/view/${item.id}`}>
        <p className="text-gray-700 mb-2 cursor-pointer">
          {item.data().aboutBook.substr(0, 150)}...
        </p>
      </Link>
      <p className="flex text-xl font-medium items-center my-3 ">
        <FaRupeeSign />
        {item.data().bookPrice}
      </p>
      <Link to={`/view/myorders/${bookId}`}>
        <button className="bg-green-500 px-2 py-1 rounded-md shadow-md text-white my-2">
          Show Order
        </button>
      </Link>
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
  );
};

export default Card;
