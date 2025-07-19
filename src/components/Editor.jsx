import { useState, useContext, useRef } from "react";
import "./Editor.css";
import { TodosDispatchContext } from "../App";

const Editor = () => {
  const { onCreate } = useContext(TodosDispatchContext);
  const [content, setContent] = useState("");
  const contentRef = useRef();

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onClickSubmit = () => {
    if (content === "") {
      contentRef.current.focus();
      return;
    }
    onCreate(content);
    setContent("");
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      onClickSubmit();
    }
  };

  return (
    <div className="Editor">
      <input
        placeholder="할 일을 입력해주세요"
        type="text"
        value={content}
        onChange={onChangeContent}
        onKeyDown={onKeyDown}
        ref={contentRef}
      />
      <button onClick={onClickSubmit}>추가</button>
    </div>
  );
};
export default Editor;
