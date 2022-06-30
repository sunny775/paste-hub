import React from "react";
import styled from "styled-components";
import Comment from "./Comment";

const Root = styled.div`
  padding: 5px;
  background: #212121;
`;

const HomePage = () => (
  <Root>
    {comments.map((e, i) => (
      <Comment key={i} comment={e} />
    ))}
  </Root>
);

export default HomePage;

const comments = Array(5).fill({
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet. Suspendisse congue vulputate lobortis. Pellentesque at interdum tortor. Quisque arcu quam, malesuada vel mauris et, posuere sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit metus, efficitur lobortis nisi quis, molestie porttitor metus. Pellentesque et neque risus. Aliquam vulputate, mauris vitae tincidunt interdum, mauris mi vehicula urna, nec feugiat quam lectus vitae ex."
});
