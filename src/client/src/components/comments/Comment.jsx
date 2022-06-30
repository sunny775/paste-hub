import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Root = styled.div`
  font-size: 14px;
  text-align: left;
  display: flex;
`;

const Avatar = styled.img`
  vertical-align: middle;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 4px;
`;

const Header = styled.h3`
  margin-bottom: 4px;
  color: #00c853;
`;
const CommentBody = styled.p`
  color: #ffffff;
  opacity: 0.6;
`;
const CommentFooter = styled.p`
  color: #757575;
  margin-top: 4px;
`;

const Comment = ({ comment }) => {
  return (
    <Root>
      <Avatar src={`https://place-hold.it/150x150&text=SC&fontsize=40`} />
      <div>
        <Header>Sunny Cletus</Header>
        <CommentBody>{comment?.text}</CommentBody>
        <CommentFooter>{new Date().toGMTString()}</CommentFooter>
      </div>
    </Root>
  );
};

Comment.propTypes = {
  comment: PropTypes.object
};

export default Comment;
