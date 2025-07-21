import "./App.css";
import List from "./components/List.jsx";
import Header from "./components/Header.jsx";
import Editor from "./components/Editor.jsx";
import {
  useState,
  useReducer,
  useRef,
  createContext,
  useEffect,
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
  let nextState;

  switch (action.type) {
    case "CREATE":
      nextState = [action.data, ...state];
      break;
    case "DELETE":
      nextState = state.filter((item) => {
        return item.id !== action.targetId;
      });
      break;
    case "UPDATE":
      nextState = state.map((item) => {
        return item.id === action.targetId
          ? { ...item, isDone: !item.isDone }
          : item;
      });
      break;
    case "INIT":
      return action.data;
    default:
      return state;
  }
  localStorage.setItem("todo", JSON.stringify(nextState));
  return nextState;
};

export const TodosStateContext = createContext();
export const TodosDispatchContext = createContext();

function App() {
  const [todo, dispatch] = useReducer(reducer, []);
  const idRef = useRef(3);
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedData = localStorage.getItem("todo");
    if (!storedData) {
      setIsLoading(false);
      return;
    }

    const parsedData = JSON.parse(storedData);

    if (!Array.isArray(parsedData)) {
      setIsLoading(false);
      return;
    }

    dispatch({
      type: "INIT",
      data: parsedData,
    });

    setIsLoading(false);
  }, []);

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

  const onDark = () => {
    setIsDark(!isDark);
    if (isDark) {
      console.log("isdarktrue");
    } else {
      console.log("isdark false");
    }
  };

  useEffect(() => {
    if (isDark) {
      document.querySelector("body").classList.add("dark");
    } else {
      document
        .querySelector("body")
        .classList.remove("dark");
    }
  }, [isDark]);

  if (isLoading) {
    return <div>로딩중입니다...</div>;
  }

  return (
    <div className={`App${isDark ? " dark" : ""}`}>
      <TodosStateContext.Provider value={todo}>
        <TodosDispatchContext.Provider
          value={{
            onCreate,
            onDelete,
            onUpdate,
            onDark,
            isDark,
          }}
        >
          <Header />
          <Editor />
          <List />
        </TodosDispatchContext.Provider>
      </TodosStateContext.Provider>
    </div>
  );
}

export default App;
