import  { useState, useEffect } from "react";
import axios from "axios";
import BorderExample from "../../components/Spinner.jsx";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchdata = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:3000/getAllBooks");
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay for testing
        setBooks(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchdata();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-3xl font-semibold ml-1.5">Book List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="mr-9 text-6xl text-sky-800" />
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-full">
          <BorderExample />
        </div>
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr className="text-white">
              <th className="border border-gray-200 rounded-md">No.</th>
              <th className="border border-gray-200 rounded-md px-3">Title</th>
              <th className="border border-gray-200 rounded-md px-2">Author</th>
              <th className="border border-gray-200 rounded-md">
                Publish Year
              </th>
              <th className="border border-gray-200 rounded-md">Operations</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book, index) => (
              <tr className="text-white" key={book._id}>
                <th className="border border-gray-200 rounded-md">
                  {index + 1}
                </th>
                <th className="border border-gray-200 rounded-md px-3">
                  {book.title}
                </th>
                <th className="border border-gray-200 rounded-md px-2">
                  {book.author}
                </th>
                <th className="border border-gray-200 rounded-md">
                  {book.publishYear}
                </th>
                <th className="border border-gray-200 rounded-md">
                  <div className="flex justify-center text-2xl space-x-6">
                    <Link to={`/getBook/${book._id}`}>
                      <BsInfoCircle className="text-green-400" />
                    </Link>
                    <Link to={`/update/${book._id}`}>
                      <AiOutlineEdit className="text-blue-500" />
                    </Link>
                    <Link to={`/delete/${book._id}`}>
                      <MdOutlineDelete className="text-red-600" />
                    </Link>
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
