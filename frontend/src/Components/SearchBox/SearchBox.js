import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex">
      <Form.Control
        type="text"
        name="q"
        onChange={(event) => setKeyword(event.target.value)}
        placeholder="Search..."
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button
        type="submit"
        variant="outline-success"
        className=""
        style={{ marginLeft: "0.2rem" }}
      >
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
