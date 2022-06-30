module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  //extends: ["react-app", "react-app/jest"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module"
  }
};
