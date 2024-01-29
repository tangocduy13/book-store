import React, { useState } from "react";
import BackButton from "../components/BackButton.jsx";
import Spinner from "../components/Spinner.jsx";
import { useNavigate, useParams } from "react-router-dom";
import axiosBooks from "../helpers/api/axiosBooks.js";

const DeleteBooks = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const handleDeleteBook = () => {
    setLoading(true);
    axiosBooks
      .delete(`/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/home");
      })
      .catch((e) => {
        setLoading(false);
        console.error(e);
        if (e.response) {
          alert(e.response.data.message);
        }
      });
  };

  return (
    <div className={"my-4"}>
      <BackButton />
      <h1 className={"text-3xl my-4"}>Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div
        className={
          "flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto"
        }
      >
        <h3 className="text-2xl">Are You Sure You want to delete this book?</h3>
        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDeleteBook}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteBooks;
