import { useEffect, useState } from "react";
import logo from "../assets/back-button_7792299.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import BorderExample from "../../components/Spinner";
import axios from "axios";

const UpdateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`http://localhost:3000/getBook/${id}`)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLoading(false)
        console.log(res.data);
        setTitle(res.data.title)
        setAuthor(res.data.author)
        setPublishYear(res.data.publishYear)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const formHandle = async () => {
    const data = {
      title,
      author,
      publishYear,
    };

    try {
      setLoading(true);
      await axios.put(`http://localhost:3000/update/${id}`, data);
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="ml-4 mt-4">
      <div>
        <Link to={"/"}>
          <button>
            <img src={logo} alt="backbutton" className="h-20" />
          </button>
        </Link>

        <h1 className="text-white font-semibold text-3xl">Update Book</h1>
      </div>

      {loading ? (
       <div className="flex justify-center items-center h-full">
       <BorderExample />
     </div>
      ) : (
        <div className="flex justify-center items-center mt-10">
          <div className="flex flex-col h-[21rem] w-[35rem] bg-white rounded-xl pt-7 space-y-8">
            <label className="ml-4 text-[1.5rem]">
              Title:
              <input
                type="text"
                value={title}
                placeholder="Enter name of book"
                className="ml-24 pl-2 w-80 border-2 border-gray-600 rounded"
                onChange={(e) => setTitle(e.target.value)}
              ></input>
            </label>

            <label className="ml-4 pt-5 text-[1.5rem]">
              Author:
              <input
                type="text"
                value={author}
                placeholder="Enter name of book's Author"
                className="ml-[4.2rem] pl-2 w-80 border-2 border-gray-600 rounded"
                onChange={(e) => setAuthor(e.target.value)}
              ></input>
            </label>

            <label className="ml-4 pt-5 text-[1.5rem]">
              Publish year:
              <input
                type="text"
                value={publishYear}
                placeholder="Enter publish year"
                className="ml-4 pl-2 w-80 border-2 border-gray-600 rounded"
                onChange={(e) => setPublishYear(e.target.value)}
              ></input>
            </label>

            <div className="flex justify-center items-center text-3xl">
              <button
                className="bg-blue-600 rounded-xl px-4 py-1 shadow-2xl hover:bg-blue-400 active:transform active:scale-95"
                onClick={formHandle}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateBook;
