import "./App.css";
import List from "./components/List.jsx";
import Header from "./components/Header.jsx";
import Editor from "./components/Editor.jsx";
import { useState, useReducer, useRef } from "react";

const mokData = [
  {
    id: 0,
    isDone: false,
    content: "운동하기",
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "공부하기",
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "다이소가서 편지지 사오기",
    date: new Date().getTime(),
  },
];

function App() {
  const [todo, setTodo] = useState(mokData);
  const idRef = useRef(3);
  console.log(todo);

  const onCreate = (content) => {
    setTodo([
      {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime(),
      },
      ...todo,
    ]);
  };

  const onDelete = (targetId) => {
    setTodo(
      todo.filter((item) => {
        return item.id !== targetId;
      })
    );
  };

  const onUpdate = (targetId) => {
    console.log(targetId);
    setTodo(
      todo.map((item) => {
        return item.id === targetId
          ? { ...item, isDone: !item.isDone }
          : item;
      })
    );
  };

  return (
    <div className="App">
      <Header />
      <Editor onCreate={onCreate} />
      <List
        todo={todo}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    </div>
  );
}

export default App;
