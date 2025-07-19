import "./TodoItem.css";

const TodoItem = ({
  id,
  isDone,
  content,
  date,
  onDelete,
  onUpdate,
}) => {
  const onClickDelete = () => {
    onDelete(id);
  };
  const onChangeUpdate = () => {
    onUpdate(id);
  };
  return (
    <div className="TodoItem">
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
