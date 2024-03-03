import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { Link } from "react-router-dom";
const FetchBooks = () => {
  const { isLoggedIn, fetchMyBooks, userData } = useFirebase();
  const [bookData, setBookData] = useState([]);

  const userId = localStorage.getItem("userid");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersData = await fetchMyBooks(userId).then((books) =>
          setBookData(books.docs)
        );
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading...</p>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!isLoggedIn) navigate("/login");

  if (bookData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-6">
        <h1 className="text-2xl font-bold mb-4">
          You haven't published any books yet
        </h1>
        <Link
          to="/addbooks"
          className="duration-300 shadow-md bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded"
        >
          Publish Now
        </Link>
      </div>
    );
  }
  return (
    <div className=" w-[80vw] mx-auto  mt-28 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {bookData.map((item, index) => (
        <Card bookId={item.id} key={index} item={item} />
      ))}
    </div>
  );
};

export default FetchBooks;
