import { useEffect, useState } from "react";
import logo from "../assets/back-button_7792299.png";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import BorderExample from "../../components/Spinner";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchdata = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:3000/getBook/${id}`);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(res.data);
        setBook(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchdata();
  }, []);

  return (
    <div className="ml-4 mt-2">
      <div>
        <Link to={`/`}>
          <button>
            <img src={logo} alt="backbutton" className="h-20 opacity-45" />
          </button>
        </Link>
      </div>

      <div className="text-white text-3xl font-semibold ml-2">Show Book</div>

      <div className="h-[25rem] w-[47rem] mt-2 border-2 rounded-xl">
        {loading ? (
         <div className="flex justify-center items-center h-full">
         <BorderExample />
       </div>
        ) : (
          <div className="text-white ml-4 mt-3 text-2xl flex flex-col space-y-8">
            <p>
              ID : <span className="ml-[7.8rem] text-xl">{id}</span>
            </p>
            <p>
              Book Name : <span className="ml-7 text-xl">{book.title}</span>
            </p>
            <p>
              Author: <span className="ml-[5.5rem] text-xl">{book.author}</span>
            </p>
            <p>
              Publish Year :
              <span className="ml-8 text-xl">{book.publishYear}</span>
            </p>
            <p>
              Created At :
              <span className="ml-12 text-xl">
                {new Date(book.createdAt).toString()}
              </span>
            </p>
            <p>
              Updated At :
              <span className="ml-10 text-xl">
                {new Date(book.updatedAt).toString()}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowBook;
