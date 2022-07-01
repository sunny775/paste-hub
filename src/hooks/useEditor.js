import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getExtensionFromLanguage, readFile } from "../utils";
import { storage } from "../config";

export const useEditor = () => {
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [copied, setCopied] = useState(false);
  const [fileName, setFileName] = useState(Date.now().toString());
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setCopied(false);
    }, 2500);
    return () => {
      window.clearTimeout(timer);
    };
  }, [copied]);

  const onChange = (value) => {
    setValue(value);
  };

  const onEditorMount = (editor) => {
    editor?.focus();
  };

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

  const savePaste = () => {
    setSaving(true);
    const file = { text: value, mime: `text/${language}` };
    storage
      .init()
      .upload(file, { language, ext: getExtensionFromLanguage(language) })
      .then((data) => {
        setSaving(false);
        navigate(`/${data.Key}/?language=${language}`, { replace: true });
      })
      .catch((err) => {
        setSaving(false);
        console.log(err);
      });
  };

  const onUpload = (event) => {
    const files = event.target.files;
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

  return {
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
  };
};
