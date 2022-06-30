import React from "react";
import styled from "styled-components";
import { CodeEditor } from "../editor";
import Comments from "../comments";
//import EditorActions from "../editor/EditorActions";

const Main = styled.main`
  display: flex;
`;

const SinglePasteWithComments = () => (
  <div>
    {/**<EditorActions /> */}
    <Main>
      <CodeEditor />
      <Comments />
    </Main>
  </div>
);

export default SinglePasteWithComments;
