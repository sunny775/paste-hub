import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Button = styled(Link)`
  background-color: transparent;
  border: 1px solid DodgerBlue;
  color: white;
  margin-right: 5px;
  padding: 12px 16px;
  font-size: 16px;
  cursor: pointer;
`;

const HomeButton = () => {
  return (
    <Button to={"/"}>
      <svg fill="DodgerBlue" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
        <path d="M 12 2.0996094 L 1 12 L 4 12 L 4 21 L 11 21 L 11 15 L 13 15 L 13 21 L 20 21 L 20 12 L 23 12 L 12 2.0996094 z M 12 4.7910156 L 18 10.191406 L 18 11 L 18 19 L 15 19 L 15 13 L 9 13 L 9 19 L 6 19 L 6 10.191406 L 12 4.7910156 z" />
      </svg>
    </Button>
  );
};

export default HomeButton;