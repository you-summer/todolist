import { useState } from "react";
import "./Editor.css";

const Editor = ({ onCreate }) => {
  const [content, setContent] = useState("");

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onClickSubmit = () => {
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
      />
      <button onClick={onClickSubmit}>추가</button>
    </div>
  );
};
export default Editor;
