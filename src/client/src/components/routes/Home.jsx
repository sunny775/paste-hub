import React from "react";
import styled from "styled-components";
import { CodeEditor } from "../editor";

const Root = styled.div`
  display: flex;
`;

const HomePage = () => (
  <Root>
    <CodeEditor />
  </Root>
);

export default HomePage;
