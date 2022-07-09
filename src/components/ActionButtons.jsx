import VisuallyHidden from "@reach/visually-hidden";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Languages } from "../utils";
import HomeButton from "./HomeButton";

const Root = styled.div`
  display: flex;
  & > button,
  & > .btn {
    padding: 10px 20px;
    margin: 0 5px;
    opacity: 0.8;
    color: #ffffff;
    font-size: calc(10px + 2vmin);
    background-color: transparent;
    border: 1px solid #ffffff;

    &:first-child {
      margin-left: 0;
    }
    &.save {
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
    &:disabled {
      opacity: 0.4;
    }
  }
  & > .dropdown,
  .dropdown:active {
    background-color: #212121;
    color: #ffffff;
    border: 1px solid #ffffff;
    font-size: calc(10px + 2vmin);
    padding: 10px 20px;
    margin: 0 5px;
    opacity: 0.8;
    border-radius: none;
    & > option.lang {
      background-color: #212121;
    }
  }
`;

function ActionButtons({
  download,
  upload,
  copy,
  uploading,
  copied,
  save,
  saving,
  language,
  setLanguage,
  savedPaste,
}) {
  return (
    <Root>
      <HomeButton />
      <button onClick={download}>Download</button>
      <label className="btn" htmlFor="single">
        {uploading ? "uploading..." : "Upload a file"}
      </label>
      <VisuallyHidden>
        <input
          type="file"
          id="single"
          onChange={upload}
          disabled={uploading || savedPaste}
        />
      </VisuallyHidden>
      <button onClick={copy}>{copied ? "Copied!" : "Copy"}</button>
      <button className="save" onClick={save} disabled={savedPaste}>
        {saving ? "Saving..." : "Save"}
      </button>

      <VisuallyHidden>
        <label htmlFor="languages">Choose Language:</label>
      </VisuallyHidden>

      <select
        className="dropdown"
        name="languages"
        id="languages"
        value={language}
        onChange={(evt) => setLanguage(evt.target.value)}
      >
        {Object.keys(Languages).map((lang) => (
          <option key={lang} value={lang} className="lang">
            {lang}
          </option>
        ))}
      </select>
    </Root>
  );
}

ActionButtons.propTypes = {
  download: PropTypes.func.isRequired,
  upload: PropTypes.func.isRequired,
  copy: PropTypes.func.isRequired,
  uploading: PropTypes.bool.isRequired,
  copied: PropTypes.bool.isRequired,
  save: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
  setLanguage: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  savedPaste: PropTypes.bool,
};

export default ActionButtons;
