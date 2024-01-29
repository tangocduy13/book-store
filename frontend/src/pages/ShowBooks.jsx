import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton.jsx";
import Spinner from "../components/Spinner.jsx";
import useFetchApi from "../hooks/useFetchApi.jsx";

const ShowBooks = () => {
  const { id } = useParams();
  const {
    data: book,
    setDate: setBook,
    loading,
    setLoading,
  } = useFetchApi({ url: `/books/${id}` });
  const createAt = new Date(book.createdAt);
  const updatedAt = new Date(book.updatedAt);

  return (
    <div className={"p-4"}>
      <BackButton destination={"/home"} />
      <h1 className={"text-3xl my-4"}>Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div
          className={
            "flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4"
          }
        >
          <div className={"my-4"}>
            <span className={"text-xl mr-4 text-gray-500"}>ID</span>
            <span>{book._id}</span>
          </div>
          <div className={"my-4"}>
            <span className={"text-xl mr-4 text-gray-500"}>Title</span>
            <span>{book.title}</span>
          </div>
          <div className={"my-4"}>
            <span className={"text-xl mr-4 text-gray-500"}>Author</span>
            <span>{book.author}</span>
          </div>
          <div className={"my-4"}>
            <span className={"text-xl mr-4 text-gray-500"}>Publish Year</span>
            <span>{book.publishYear}</span>
          </div>
          <div className={"my-4"}>
            <span className={"text-xl mr-4 text-gray-500"}>Create Time</span>
            <span>{createAt.toLocaleDateString("vi-VN")}</span>
          </div>
          <div className={"my-4"}>
            <span className={"text-xl mr-4 text-gray-500"}>Last Update</span>
            <span>{updatedAt.toLocaleDateString("vi-VN")}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBooks;
