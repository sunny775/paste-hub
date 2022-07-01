export const Languages = {
  abap: "abap",
  aes: "aes",
  apex: "apex",
  azcli: "azcli",
  bat: "bat",
  bicep: "bicep",
  c: "c",
  cameligo: "cameligo",
  clojure: "clojure",
  coffeescript: "coffeescript",
  cpp: "cpp",
  csharp: "csharp",
  csp: "csp",
  css: "css",
  dart: "dart",
  dockerfile: "dockerfile",
  ecl: "ecl",
  elixir: "elixir",
  fsharp: "fsharp",
  go: "go",
  graphql: "graphql",
  handlebars: "handlebars",
  hcl: "hcl",
  html: "html",
  ini: "ini",
  java: "java",
  javascript: "javascript",
  json: "json",
  julia: "julia",
  kotlin: "kotlin",
  less: "less",
  lexon: "lexon",
  liquid: "liquid",
  lua: "lua",
  m3: "m3",
  markdown: "markdown",
  mips: "mips",
  msdax: "msdax",
  mysql: "mysql",
  "objective-c": "objective-c",
  pascal: "pascal",
  pascaligo: "pascaligo",
  perl: "perl",
  pgsql: "pgsql",
  php: "php",
  plaintext: "plaintext",
  postiats: "postiats",
  powerquery: "powerquery",
  powershell: "powershell",
  pug: "pug",
  python: "python",
  r: "r",
  razor: "razor",
  redis: "redis",
  redshift: "redshift",
  restructuredtext: "restructuredtext",
  ruby: "ruby",
  rust: "rust",
  sb: "sb",
  scala: "scala",
  scheme: "scheme",
  scss: "scss",
  shell: "shell",
  sol: "sol",
  sql: "sql",
  st: "st",
  swift: "swift",
  systemverilog: "systemverilog",
  tcl: "tcl",
  twig: "twig",
  typescript: "typescript",
  vb: "vb",
  verilog: "verilog",
  xml: "xml",
  yaml: "yaml"
};

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
