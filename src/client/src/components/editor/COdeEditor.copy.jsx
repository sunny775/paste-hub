import {
  Button,
  ButtonVariant,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateSecondaryActions,
  EmptyStateVariant,
  getResizeObserver,
  Popover,
  Title,
  Tooltip,
} from "@patternfly/react-core";
import CodeIcon from "@patternfly/react-icons/dist/esm/icons/code-icon";
import CopyIcon from "@patternfly/react-icons/dist/esm/icons/copy-icon";
import DownloadIcon from "@patternfly/react-icons/dist/esm/icons/download-icon";
import HelpIcon from "@patternfly/react-icons/dist/esm/icons/help-icon";
import UploadIcon from "@patternfly/react-icons/dist/esm/icons/upload-icon";
import { css } from "@patternfly/react-styles";
import styles from "@patternfly/react-styles/css/components/CodeEditor/code-editor";
import * as React from "react";
import Dropzone from "react-dropzone";
import MonacoEditor from "react-monaco-editor";
import { CodeEditorContext } from "./CodeEditorUtils";

export const Language = {
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
  yaml: "yaml",
};

export class CodeEditor extends React.Component {
  static displayName = "CodeEditor";
  editor = null;
  wrapperRef = React.createRef();
  ref = React.createRef();
  timer = null;
  observer = () => {};

  static defaultProps = {
    className: "",
    code: "",
    onEditorDidMount: () => {},
    language: Language.plaintext,
    isDarkTheme: false,
    height: "",
    width: "",
    isLineNumbersVisible: true,
    isReadOnly: false,
    isLanguageLabelVisible: false,
    loading: "",
    emptyState: "",
    emptyStateTitle: "Start editing",
    emptyStateBody: "Drag and drop a file or upload one.",
    emptyStateButton: "Browse",
    emptyStateLink: "Start from scratch",
    downloadFileName: Date.now().toString(),
    isUploadEnabled: false,
    isDownloadEnabled: false,
    isCopyEnabled: false,
    copyButtonAriaLabel: "Copy code to clipboard",
    uploadButtonAriaLabel: "Upload code",
    downloadButtonAriaLabel: "Download code",
    copyButtonToolTipText: "Copy to clipboard",
    uploadButtonToolTipText: "Upload",
    downloadButtonToolTipText: "Download",
    copyButtonSuccessTooltipText: "Content added to clipboard",
    toolTipCopyExitDelay: 1600,
    toolTipDelay: 300,
    toolTipMaxWidth: "100px",
    toolTipPosition: "top",
    customControls: null,
    isMinimapVisible: false,
    headerMainContent: "",
    shortcutsPopoverButtonText: "View Shortcuts",
    shortcutsPopoverProps: {
      bodyContent: "",
      "aria-label": "Keyboard Shortcuts",
      ...Popover.defaultProps,
    },
    showEditor: true,
    options: {},
    overrideServices: {},
    onCodeChange: () => {},
  };

  static getExtensionFromLanguage(language) {
    switch (language) {
      case Language.shell:
        return "sh";
      case Language.ruby:
        return "rb";
      case Language.perl:
        return "pl";
      case Language.python:
        return "py";
      case Language.mysql:
        return "sql";
      case Language.javascript:
        return "js";
      case Language.typescript:
        return "ts";
      case Language.markdown:
        return "md";
      case Language.plaintext:
        return "txt";
      default:
        return language.toString();
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      height: this.props.height,
      prevPropsCode: this.props.code,
      value: this.props.code,
      filename: "",
      isLoading: false,
      showEmptyState: true,
      copied: false,
    };
  }

  setHeightToFitContent() {
    const contentHeight = this.editor.getContentHeight();
    const layoutInfo = this.editor.getLayoutInfo();
    this.editor.layout({ width: layoutInfo.width, height: contentHeight });
  }

  onChange = (value, event) => {
    if (this.props.height === "sizeToFit") {
      this.setHeightToFitContent();
    }
    if (this.props.onChange) {
      this.props.onChange(value, event);
    }
    this.setState({ value });
    this.props.onCodeChange(value);
  };

  // this function is only called when the props change
  // the only conflict is between props.code and state.value
  static getDerivedStateFromProps(nextProps, prevState) {
    // if the code changes due to the props.code changing
    // set the value to props.code
    if (nextProps.code !== prevState.prevPropsCode) {
      return {
        value: nextProps.code,
        prevPropsCode: nextProps.code,
      };
    }
    // else, don't need to change the state.value
    // because the onChange function will do all the work
    return null;
  }

  handleResize = () => {
    if (this.editor) {
      this.editor.layout();
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleGlobalKeys);
    this.observer = getResizeObserver(this.ref.current, this.handleResize);
    this.handleResize();
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleGlobalKeys);
    this.observer();
  }

  handleGlobalKeys = (event) => {
    if (
      this.wrapperRef.current === document.activeElement &&
      (event.key === "ArrowDown" || event.key === " ")
    ) {
      this.editor?.focus();
      event.preventDefault();
    }
  };

  editorDidMount = (editor, monaco) => {
    // eslint-disable-next-line no-bitwise
    editor.addCommand(monaco.KeyMod.Shift | monaco.KeyCode.Tab, () =>
      this.wrapperRef.current.focus()
    );
    Array.from(document.getElementsByClassName("monaco-editor")).forEach(
      (editorElement) => editorElement.removeAttribute("role")
    );
    this.props.onEditorDidMount(editor, monaco);
    this.editor = editor;
    if (this.props.height === "sizeToFit") {
      this.setHeightToFitContent();
    }
  };

  handleFileChange = (value, filename) => {
    this.setState({
      value,
      filename,
    });
    this.props.onCodeChange(value);
  };

  handleFileReadStarted = () => this.setState({ isLoading: true });
  handleFileReadFinished = () => this.setState({ isLoading: false });

  readFile(fileHandle) {
    return (
      new Promise() <
      string >
      ((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsText(fileHandle);
      })
    );
  }

  onDropAccepted = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const fileHandle = acceptedFiles[0];
      this.handleFileChange("", fileHandle.name); // Show the filename while reading
      this.handleFileReadStarted();
      this.readFile(fileHandle)
        .then((data) => {
          this.handleFileReadFinished();
          this.toggleEmptyState();
          this.handleFileChange(data, fileHandle.name);
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error("error", error);
          this.handleFileReadFinished();
          this.handleFileChange("", ""); // Clear the filename field on a failure
        });
    }
  };

  onDropRejected = (rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      // eslint-disable-next-line no-console
      console.error("There was an error accepting that dropped file"); // TODO
    }
  };

  copyCode = () => {
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.setState({ copied: false });
    }
    this.editor?.focus();
    document.execCommand("copy");
    this.setState({ copied: true }, () => {
      this.timer = window.setTimeout(() => {
        this.setState({ copied: false });
        this.timer = null;
      }, 2500);
    });
  };

  download = () => {
    const { value } = this.state;
    const element = document.createElement("a");
    const file = new Blob([value], { type: "text" });
    element.href = URL.createObjectURL(file);
    element.download = `${
      this.props.downloadFileName
    }.${CodeEditor.getExtensionFromLanguage(this.props.language)}`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  toggleEmptyState = () => {
    this.setState({ showEmptyState: false });
  };

  render() {
    const { height, value, isLoading, showEmptyState, copied } = this.state;
    const {
      isDarkTheme,
      width,
      className,
      isCopyEnabled,
      copyButtonSuccessTooltipText,
      isReadOnly,
      isUploadEnabled,
      isLanguageLabelVisible,
      copyButtonAriaLabel,
      copyButtonToolTipText,

      uploadButtonToolTipText,
      downloadButtonAriaLabel,
      downloadButtonToolTipText,
      toolTipDelay,
      toolTipCopyExitDelay,
      toolTipMaxWidth,
      toolTipPosition,
      isLineNumbersVisible,
      isDownloadEnabled,
      language,
      emptyState: providedEmptyState,
      emptyStateTitle,
      emptyStateBody,
      emptyStateButton,
      emptyStateLink,
      customControls,
      isMinimapVisible,
      headerMainContent,
      shortcutsPopoverButtonText,
      shortcutsPopoverProps: shortcutsPopoverPropsProp,
      showEditor,
      options: optionsProp,
      overrideServices,
    } = this.props;
    const shortcutsPopoverProps = {
      ...CodeEditor.defaultProps.shortcutsPopoverProps,
      ...shortcutsPopoverPropsProp,
    };
    const options = {
      scrollBeyondLastLine: height !== "sizeToFit",
      readOnly: isReadOnly,
      cursorStyle: "line",
      lineNumbers: isLineNumbersVisible ? "on" : "off",
      tabIndex: -1,
      minimap: {
        enabled: isMinimapVisible,
      },
      ...optionsProp,
    };

    return (
      <Dropzone
        multiple={false}
        onDropAccepted={this.onDropAccepted}
        onDropRejected={this.onDropRejected}
      >
        {({ getRootProps, getInputProps, isDragActive, open }) => {
          const emptyState =
            providedEmptyState ||
            (isUploadEnabled ? (
              <EmptyState variant={EmptyStateVariant.small}>
                <EmptyStateIcon icon={CodeIcon} />
                <Title headingLevel="h4" size="lg">
                  {emptyStateTitle}
                </Title>
                <EmptyStateBody>{emptyStateBody}</EmptyStateBody>
                <Button variant="primary" onClick={open}>
                  {emptyStateButton}
                </Button>
                <EmptyStateSecondaryActions>
                  <Button variant="link" onClick={this.toggleEmptyState}>
                    {emptyStateLink}
                  </Button>
                </EmptyStateSecondaryActions>
              </EmptyState>
            ) : (
              <EmptyState variant={EmptyStateVariant.small}>
                <EmptyStateIcon icon={CodeIcon} />
                <Title headingLevel="h4" size="lg">
                  {emptyStateTitle}
                </Title>
                <Button variant="primary" onClick={this.toggleEmptyState}>
                  {emptyStateLink}
                </Button>
              </EmptyState>
            ));

          const editorHeader = (
            <div className={css(styles.codeEditorHeader)}>
              {
                <div className={css(styles.codeEditorControls)}>
                  {isCopyEnabled && (!showEmptyState || !!value) && (
                    <Tooltip
                      trigger="mouseenter"
                      content={
                        <div>
                          {copied
                            ? copyButtonSuccessTooltipText
                            : copyButtonToolTipText}
                        </div>
                      }
                      exitDelay={copied ? toolTipCopyExitDelay : toolTipDelay}
                      entryDelay={toolTipDelay}
                      maxWidth={toolTipMaxWidth}
                      position={toolTipPosition}
                    >
                      <Button
                        onClick={this.copyCode}
                        variant="control"
                        aria-label={copyButtonAriaLabel}
                      >
                        <CopyIcon />
                      </Button>
                    </Tooltip>
                  )}
                  {isUploadEnabled && (
                    <Tooltip
                      trigger="mouseenter focus click"
                      content={<div>{uploadButtonToolTipText}</div>}
                      entryDelay={toolTipDelay}
                      exitDelay={toolTipDelay}
                      maxWidth={toolTipMaxWidth}
                      position={toolTipPosition}
                    >
                      <Button
                        onClick={open}
                        variant="control"
                        aria-label={uploadButtonAriaLabel}
                      >
                        <UploadIcon />
                      </Button>
                    </Tooltip>
                  )}
                  {isDownloadEnabled && (!showEmptyState || !!value) && (
                    <Tooltip
                      trigger="mouseenter focus click"
                      content={<div>{downloadButtonToolTipText}</div>}
                      entryDelay={toolTipDelay}
                      exitDelay={toolTipDelay}
                      maxWidth={toolTipMaxWidth}
                      position={toolTipPosition}
                    >
                      <Button
                        onClick={this.download}
                        variant="control"
                        aria-label={downloadButtonAriaLabel}
                      >
                        <DownloadIcon />
                      </Button>
                    </Tooltip>
                  )}
                  {customControls && (
                    <CodeEditorContext.Provider value={{ code: value }}>
                      {customControls}
                    </CodeEditorContext.Provider>
                  )}
                </div>
              }
              {
                <div className={css(styles.codeEditorHeaderMain)}>
                  {headerMainContent}
                </div>
              }
              {!!shortcutsPopoverProps.bodyContent && (
                <div className="pf-c-code-editor__keyboard-shortcuts">
                  <Popover {...shortcutsPopoverProps}>
                    <Button variant={ButtonVariant.link} icon={<HelpIcon />}>
                      {shortcutsPopoverButtonText}
                    </Button>
                  </Popover>
                </div>
              )}
              {isLanguageLabelVisible && (
                <div className={css(styles.codeEditorTab)}>
                  <span className={css(styles.codeEditorTabIcon)}>
                    <CodeIcon />
                  </span>
                  <span className={css(styles.codeEditorTabText)}>
                    {language.toUpperCase()}
                  </span>
                </div>
              )}
            </div>
          );

          const editor = (
            <div
              className={css(styles.codeEditorCode)}
              ref={this.wrapperRef}
              tabIndex={0}
            >
              <MonacoEditor
                height={height}
                width={width}
                language={language}
                value={value}
                options={options}
                overrideServices={overrideServices}
                onChange={this.onChange}
                editorDidMount={this.editorDidMount}
                theme={isDarkTheme ? "vs-dark" : "vs-light"}
              />
            </div>
          );

          return (
            <div
              className={css(
                styles.codeEditor,
                isReadOnly && styles.modifiers.readOnly,
                className
              )}
              ref={this.ref}
            >
              {isUploadEnabled || providedEmptyState ? (
                <div
                  {...getRootProps({
                    onClick: (event) => event.preventDefault(), // Prevents clicking TextArea from opening file dialog
                  })}
                  className={`pf-c-file-upload ${
                    isDragActive && "pf-m-drag-hover"
                  } ${isLoading && "pf-m-loading"}`}
                >
                  {editorHeader}
                  <div className={css(styles.codeEditorMain)}>
                    <input
                      {...getInputProps()} /* hidden, necessary for react-dropzone */
                    />
                    {(showEmptyState || providedEmptyState) && !value
                      ? emptyState
                      : editor}
                  </div>
                </div>
              ) : (
                <>
                  {editorHeader}
                  {showEditor && (
                    <div className={css(styles.codeEditorMain)}>{editor}</div>
                  )}
                </>
              )}
            </div>
          );
        }}
      </Dropzone>
    );
  }
}