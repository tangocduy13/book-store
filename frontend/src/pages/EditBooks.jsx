import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton.jsx";
import Spinner from "../components/Spinner.jsx";
import axiosBooks from "../helpers/api/axiosBooks.js";
import { useNavigate, useParams } from "react-router-dom";
import useFetchApi from "../hooks/useFetchApi.jsx";

const EditBooks = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axiosBooks
      .get(`/books/${id}`)
      .then(({ data }) => {
        setTitle(data.data.title);
        setAuthor(data.data.author);
        setPublishYear(data.data.publishYear);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  const handleEditBook = () => {
    setLoading(true);
    const data = {
      title,
      author,
      publishYear,
    };
    axiosBooks
      .put(`/books/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/home");
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          alert(error.response.data.message);
        }
      });
  };

  return (
    <div className={"p-4"}>
      <BackButton destination={"/home"} />
      <h1 className={"text-3xl my-4"}>Edit Book</h1>
      {loading ? <Spinner /> : ""}
      <div
        className={
          "flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto"
        }
      >
        <div className={"my-4"}>
          <label className={"text-xl mr-4 text-gray-500"}>Title</label>
          <input
            className={"border-2 border-gray-500 px-4 py-2 w-full"}
            type={"text"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={"my-4"}>
          <label className={"text-xl mr-4 text-gray-500"}>Author</label>
          <input
            className={"border-2 border-gray-500 px-4 py-2 w-full"}
            type={"text"}
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className={"my-4"}>
          <label className={"text-xl mr-4 text-gray-500"}>Publish Year</label>
          <input
            className={"border-2 border-gray-500 px-4 py-2 w-full"}
            type={"number"}
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
          />
        </div>
        <button className={"p-2 bg-sky-300 m-8"} onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBooks;
