import React from "react";
import styled from "styled-components";
import VisuallyHidden from "@reach/visually-hidden";
import PropTypes from "prop-types";
import Languages from "./Languages";

const Root = styled.div`
  display: flex;
  & > button,
  & > label.btn,
  select.btn {
    padding: 10px 20px;
    margin: 0 10px;
    opacity: 0.8;
    color: #ffffff;
    background-color: transparent;
    border: 1px solid #ffffff;

    &:first-child {
      margin-left: 0;
    }
    &.save {
      margin-right: 0;
      border-color: #00c853;
      background-color: #00c853;
    }

    &:hover {
      position: relative;
      opacity: 1;
      cursor: pointer;
    }
    &:active {
      opacity: 1;
      background: white;
      border: 1px solid white;
      color: gray;
    }
  }
`;

function EditorActions({ download, upload, copy, uploading, copied, language, setLanguage }) {
  return (
    <Root>
      <button onClick={download}>Download</button>
      <label className="btn" htmlFor="single">
        {uploading ? "uploading..." : "Upload a file"}
      </label>
      <VisuallyHidden>
        <input type="file" id="single" onChange={upload} disabled={uploading} />
      </VisuallyHidden>
      <button onClick={copy}>{copied ? "Copied!" : "Copy"}</button>
      <button className="save">Save</button>
      <VisuallyHidden>
        <label htmlFor="languages">Choose Language:</label>
      </VisuallyHidden>

      <select
        className="btn"
        name="languages"
        id="languages"
        form="langform"
        defaultValue={language}
        onChange={(evt) => setLanguage(evt.target.value)}
      >
        {Object.keys(Languages).map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>
    </Root>
  );
}

EditorActions.propTypes = {
  download: PropTypes.func.isRequired,
  upload: PropTypes.func.isRequired,
  copy: PropTypes.func.isRequired,
  uploading: PropTypes.bool.isRequired,
  copied: PropTypes.bool.isRequired,
  setLanguage: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired
};

export default EditorActions;
