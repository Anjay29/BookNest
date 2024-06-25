import { useState } from "react";
import logo from "../assets/back-button_7792299.png";
import { Link, useParams, useNavigate } from "react-router-dom";
import BorderExample from "../../components/Spinner";
import axios from "axios";

const DeleteBook = () => {
  const {id} = useParams();
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()

  const deleteBook = async () => {
    setLoading(true)
    try {
      await axios.delete(`http://localhost:3000/delete/${id}`)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false)
      navigate('/')
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };

  console.log(`id ki value ${id}`);

  return (
    <div className="ml-4 mt-2">
      <div>
        <Link to={"/"}>
          <button>
            <img src={logo} alt="backbutton" className="h-20" />
          </button>
        </Link>

        <h1 className="text-white font-semibold text-3xl">Delete Book</h1>
      </div>

      {loading ? <div className="flex justify-center items-center h-full">
          <BorderExample />
        </div> : <div className="flex justify-center items-center mt-16">
        <div className="h-[8.5rem] w-[35rem] bg-white rounded-lg">
          <div className="flex justify-center p-4 text-2xl font-semibold">
            <h1>Are you sure you want delete this book?</h1>
          </div>

          <div className="flex justify-center text-2xl font-semibold">
            <button
              className="bg-red-600 p-2 px-4 rounded-lg mr-10  hover:bg-red-400 active:transform active:scale-95"
              onClick={deleteBook}
            >
              Yes
            </button>
            <button className="bg-green-600 p-2 px-4 rounded-lg hover:bg-green-400 active:transform active:scale-95">
              <Link to={"/"}> No </Link>
            </button>
          </div>
        </div>
      </div>
      }
    </div>
  );
};

export default DeleteBook;
