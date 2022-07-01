import MonacoEditor from "@monaco-editor/react";
import styled from "styled-components";
import { useEditor } from "../../hooks";
import EditorActions from "../ActionButtons";

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

const Home = () => {
  const {
    value,
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
    saving,
  } = useEditor();
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

export default Home;
