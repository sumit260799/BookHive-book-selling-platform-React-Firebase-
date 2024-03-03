import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import { Link } from "react-router-dom";
const FetchOrders = () => {
  const params = useParams();
  const { fetchMyOrders } = useFirebase();
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    fetchMyOrders(params.id).then((orders) => setMyOrders(orders.docs));
  }, [fetchMyOrders, params.id]);

  if (myOrders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <h1 className="text-2xl font-bold mb-4">
          "No one has ordered your books yet."
        </h1>
      </div>
    );
  }
  return (
    <div className="mt-6 w-[60vw] mx-auto">
      <ul className="divide-y  divide-gray-200">
        {myOrders.map((order) => {
          const data = order.data();
          return (
            <li key={order.id} className="py-6 flex">
              <img
                src={data.cover}
                alt={data.bookName}
                className="flex-none w-24 h-24 object-cover rounded-md"
              />
              <div className="ml-4 w-[100%] flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">{data.bookName}</h2>
                  <div className="flex items-center mt-2">
                    <span className="text-gray-600 mr-2">Quantity:</span>
                    <span className="font-semibold">{data.bookQnty}</span>
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <img
                    src={data.userPic}
                    alt={data.userName}
                    className="w-10 h-10 object-cover rounded-full mr-2"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{data.userName}</h3>
                    <p className="text-gray-600">{data.userEmail}</p>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FetchOrders;
