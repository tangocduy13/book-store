import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner.jsx";
import { Link } from "react-router-dom";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import useFetchApi from "../hooks/useFetchApi.jsx";
import BooksTable from "../components/Home/BooksTable.jsx";
import BooksCard from "../components/Home/BooksCard.jsx";

const Home = () => {
  const {
    data: books,
    setData: setBooks,
    loading,
    setLoading,
  } = useFetchApi({ url: "/books" });
  const [showType, setShowType] = useState("table");

  return (
    <div className={"p-4"}>
      <div className={"flex justify-center items-center gap-x-4"}>
        <button
          className={"bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"}
          onClick={() => {
            setShowType("table");
          }}
        >
          Table
        </button>
        <button
          className={"bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"}
          onClick={() => {
            setShowType("card");
          }}
        >
          Card
        </button>
      </div>
      <div className={"flex justify-between items-center"}>
        <h1 className={"text-3xl my-8"}>Books List</h1>
        <Link to={"/books/create"}>
          <MdOutlineAddBox className={"text-sky-800 text-4xl"} />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
