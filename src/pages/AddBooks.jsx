import { useEffect, useState } from "react";
import { FcGallery } from "react-icons/fc";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";
export default function AddBooks() {
  const navigate = useNavigate();

  const [bookName, setBookName] = useState("");
  const [bookPrice, setBookPrice] = useState("");
  const [aboutBook, setAboutBook] = useState("");
  const [bookFiles, setBookFiles] = useState([]);
  const { addBooksInFireStore, isLoggedIn } = useFirebase();

  const handleSubmit = (e) => {
    e.preventDefault();
    addBooksInFireStore(bookName, bookPrice, aboutBook, bookFiles);
    setBookName("");
    setAboutBook("");
    setBookFiles("");
    setBookPrice("");
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate, isLoggedIn]);

  return (
    <section>
      <form className=" my-2  mx-auto " onSubmit={handleSubmit}>
        <div className=" w-[90vw] md:w-[80vw] lg:w-[70vw] xl:w-[50vw] rounded-xl  lg:p-8 space-y-12  my-3 mx-auto">
          <div className="">
            <h2 className="w-[100%] text-center text-3xl font-semibold  mx-auto leading-7 text-gray-900">
              AddBooks
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-full">
                <label
                  htmlFor="bookname"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Book Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-[100%]">
                    <input
                      type="text"
                      name="bookname"
                      id="bookname"
                      autoComplete="bookname"
                      value={bookName}
                      onChange={(e) => setBookName(e.target.value)}
                      className="block p-2 flex-1 border-0 rounded-md py-1.5 pl-3 text-gray-900  focus:ring-0 sm:text-md sm:leading-6"
                      placeholder="Enter Bookname.."
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="aboutBook"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  About Book
                </label>
                <div className="mt-2">
                  <textarea
                    id="aboutBook"
                    name="aboutBook"
                    value={aboutBook}
                    onChange={(e) => setAboutBook(e.target.value)}
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                  />
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="bookPrice"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Book Price
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    id="bookPrice"
                    name="bookPrice"
                    value={bookPrice}
                    onChange={(e) => setBookPrice(e.target.value)}
                    className="block w-full p-2 rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Cover photo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-2">
                  <div className="text-center">
                    <FcGallery
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-md leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={(e) => setBookFiles(e.target.files[0])}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
                <p className="text-md text-blue-700">
                  {bookFiles && bookFiles.name}
                </p>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="text-[1.2rem] font-sans font-normal capitalize py-2 px-5 tracking-wider  my-4  hover:bg-gray-700 bg-gray-800 shadow-lg text-white rounded-md"
          >
            submit
          </button>
        </div>
      </form>
    </section>
  );
}
