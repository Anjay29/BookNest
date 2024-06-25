// import React from "react";
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/Home.jsx";
import CreateBook from "./pages/CreateBook.jsx";
import DeleteBook from "./pages/DeleteBook.jsx";
import ShowBook from "./pages/ShowBook.jsx";
import UpdateBook from "./pages/UpdateBook.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books/create" element={<CreateBook />} />
      <Route path="/getBook/:id" element={<ShowBook />} />
      <Route path="/update/:id" element={<UpdateBook />} />
      <Route path="/delete/:id" element={<DeleteBook />} />
    </Routes>
  );
};
export default App;