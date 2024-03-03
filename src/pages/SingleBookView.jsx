import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

const SingleBookView = () => {
  const { getBooksById } = useFirebase();
  const params = useParams();
  const [book, setBook] = useState({});

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const doc = await getBooksById(params.id);
        setBook(doc.data());
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };

    fetchBook();
  }, [getBooksById, params.id]);

  return (
    <div className="container mx-auto px-4 mt-14 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <img
          className="w-[350px] h-[400px] mb-4"
          src={book.cover}
          alt="Book Cover"
        />
        <h1 className="text-2xl font-semibold mb-2">{book.bookName}</h1>
        <p className="text-gray-700 mb-4">{book.aboutBook}</p>
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full mr-4"
            src={book.userPic}
            alt="Author"
          />
          <div>
            <p className="text-lg font-semibold">{book.userName}</p>
            <p className="text-gray-600">{book.userEmail}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBookView;
