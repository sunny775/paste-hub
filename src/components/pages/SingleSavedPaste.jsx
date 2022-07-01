import React, { useEffect } from "react";
import MonacoEditor from "@monaco-editor/react";
import styled from "styled-components";
import { useParams, useSearchParams } from "react-router-dom";
import EditorActions from "../ActionButtons";
import { useEditor } from "../../hooks";
import { storage } from "../../config";

const Root = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  & > .content {
    width: fit-content;
  }
`;
const EditorWrapper = styled.div`
  border: 1px solid #00c853;
  margin-right: 5px;
  margin-top: 10px;
  color: #fff;
`;

const SingleSavedPaste = () => {
  const {
    value,
    setValue,
    onEditorMount,
    onChange,
    copyCode,
    download,
    onUpload,
    uploading,
    copied,
    language,
    setLanguage,
    savePaste,
    saving
  } = useEditor();

  const params = useParams();
  const [search] = useSearchParams();

  useEffect(() => {
    storage
      .init()
      .getObject(params.hash)
      .then((data) => {
        setValue(new TextDecoder().decode(data.Body));
        const language = search.get("language");
        if (language) setLanguage(language);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Root>
      <div className="content">
        <EditorActions
          copy={copyCode}
          download={download}
          upload={onUpload}
          uploading={uploading}
          copied={copied}
          language={language}
          setLanguage={setLanguage}
          save={savePaste}
          saving={saving}
          savedPaste
        />

        <EditorWrapper tabIndex={0}>
          <MonacoEditor
            height={"90vh"}
            language={language}
            value={value}
            onChange={onChange}
            onMount={onEditorMount}
            theme={"vs-dark"}
          />
        </EditorWrapper>
      </div>
    </Root>
  );
};

export default SingleSavedPaste;
