import { useState } from "react";
import "./List.css";
import TodoItem from "./TodoItem";

const List = ({ todo, onDelete, onUpdate }) => {
  const [search, setSearch] = useState("");

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const getFilteredData = () => {
    if (search === "") {
      return todo;
    }

    return todo.filter((todos) => {
      return todos.content
        .toLowerCase()
        .includes(search.toLowerCase());
    });
  };

  const filterTodo = getFilteredData();

  return (
    <div className="List">
      <input
        value={search}
        type="text"
        placeholder="검색어를 입력하세요"
        onChange={onChangeSearch}
      />
      {filterTodo.map((todo) => {
        return (
          <TodoItem
            {...todo}
            key={todo.id}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        );
      })}
    </div>
  );
};
export default List;
