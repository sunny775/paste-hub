import React, { useEffect, useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import PropTypes from "prop-types";
import { getExtensionFromLanguage, readFile } from "./utils";
import EditorActions from "./EditorActions";

export const CodeEditor = (props) => {
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [copied, setCopied] = useState(false);
  const [fileName, setFileName] = useState(Date.now().toString());
  const [uploading, setUploading] = useState(false);

  const onChange = (value) => {
    setValue(value);
    console.log(value);
  };

  const onEditorMount = (editor) => {
    editor?.focus();
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setCopied(false);
    }, 2500);
    return () => {
      window.clearTimeout(timer);
    };
  }, [copied]);

  const copyCode = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
  };

  const download = () => {
    const element = document.createElement("a");
    const file = new Blob([value], { type: "text" });
    element.href = URL.createObjectURL(file);
    element.download = `${fileName}.${getExtensionFromLanguage(language)}`;
    document.body.appendChild(element);
    element.click();
  };

  const onUpload = (event) => {
    const files = event.target.files;
    console.log(files);
    console.group("uploading");
    if (files.length > 0) {
      const fileHandle = files[0];
      setUploading(true);
      readFile(fileHandle)
        .then((data) => {
          setValue(data);
          setUploading(false);
          setFileName(fileHandle.name);
        })
        .catch((error) => {
          console.error("error", error);
          setUploading(false);
        });
    }
  };

  const { isDarkTheme, showEditor } = props;

  const editorComponent = (
    <div tabIndex={0}>
      <MonacoEditor
        height={"90vh"}
        width={"70vw"}
        language={language}
        value={value}
        defaultLanguage="javascript"
        defaultValue="// some comment"
        onChange={onChange}
        onMount={onEditorMount}
        theme={isDarkTheme ? "vs-dark" : "vs-light"}
      />
    </div>
  );

  return (
    <div>
      <EditorActions
        copy={copyCode}
        download={download}
        upload={onUpload}
        uploading={uploading}
        copied={copied}
        language={language}
        setLanguage={setLanguage}
      />
      {showEditor && (
        <div style={{ border: "1px solid #00c853", marginRight: 10, marginTop: 10, color: "#fff" }}>
          {editorComponent}
        </div>
      )}
    </div>
  );
};

CodeEditor.defaultProps = {
  isDarkTheme: true,
  showEditor: true
};

CodeEditor.propTypes = {
  isDarkTheme: PropTypes.bool.isRequired,
  showEditor: PropTypes.bool.isRequired
};
