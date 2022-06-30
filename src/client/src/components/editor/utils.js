import Languages from "./Languages";
export function getExtensionFromLanguage(language) {
  switch (language) {
    case Languages.shell:
      return "sh";
    case Languages.ruby:
      return "rb";
    case Languages.perl:
      return "pl";
    case Languages.python:
      return "py";
    case Languages.mysql:
      return "sql";
    case Languages.javascript:
      return "js";
    case Languages.typescript:
      return "ts";
    case Languages.markdown:
      return "md";
    case Languages.plaintext:
      return "txt";
    default:
      return language.toString();
  }
}

export function readFile(fileHandle) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsText(fileHandle);
  });
}
