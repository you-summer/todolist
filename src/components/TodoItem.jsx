import "./TodoItem.css";
import { useContext } from "react";
import { TodosDispatchContext } from "../App";

const TodoItem = ({ id, isDone, content, date }) => {
  const { onDelete, onUpdate } = useContext(
    TodosDispatchContext
  );

  const onClickDelete = () => {
    onDelete(id);
  };
  const onChangeUpdate = () => {
    onUpdate(id);
  };

  return (
    <div className={`TodoItem ${isDone ? "Done" : ""}`}>
      <input
        type="checkbox"
        checked={isDone}
        onChange={onChangeUpdate}
      />
      <div className="content">{content}</div>
      <div className="date">
        {new Date(date).toLocaleDateString()}
      </div>
      <button onClick={onClickDelete}>🗑️</button>
    </div>
  );
};
export default TodoItem;
