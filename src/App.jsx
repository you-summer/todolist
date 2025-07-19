import "./App.css";
import List from "./components/List.jsx";
import Header from "./components/Header.jsx";
import Editor from "./components/Editor.jsx";
import {
  useState,
  useReducer,
  useRef,
  createContext,
} from "react";

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

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];
    case "DELETE":
      return state.filter((item) => {
        return item.id !== action.targetId;
      });
    case "UPDATE":
      return state.map((item) => {
        return item.id === action.targetId
          ? { ...item, isDone: !item.isDone }
          : item;
      });
    default:
      return state;
  }
};

export const TodosStateContext = createContext();
export const TodosDispatchContext = createContext();

function App() {
  const [todo, dispatch] = useReducer(reducer, mokData);
  const idRef = useRef(3);

  const onCreate = (content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime(),
      },
    });
  };

  const onDelete = (targetId) => {
    dispatch({
      type: "DELETE",
      targetId: targetId,
    });
  };

  const onUpdate = (targetId) => {
    console.log(targetId);
    dispatch({
      type: "UPDATE",
      targetId: targetId,
    });
  };

  return (
    <div className="App">
      <Header />
      <TodosStateContext.Provider value={todo}>
        <TodosDispatchContext.Provider
          value={{ onCreate, onDelete, onUpdate }}
        >
          <Editor />
          <List />
        </TodosDispatchContext.Provider>
      </TodosStateContext.Provider>
    </div>
  );
}

export default App;
