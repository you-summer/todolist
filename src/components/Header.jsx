import "./Header.css";
import { useContext, useState, useEffect } from "react";
import {
  TodosStateContext,
  TodosDispatchContext,
} from "../App";

const Header = () => {
  const today = new Date().toLocaleDateString("kr", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  const [time, setTime] = useState(new Date());
  const hour = time.getHours(); // 시간
  const min = time.getMinutes(); // 분
  const min2 = min < 10 ? `0${min}` : min;
  const sec = time.getSeconds(); // 초
  const sec2 = sec < 10 ? `0${sec}` : sec;

  useEffect(() => {
    let timer = setInterval(() => {
      setTime(new Date());
      console.log("test");
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  //   setInterval(() => {
  //     setTime(new Date());
  //     // console.log("test");
  //   }, 1000);

  const todo = useContext(TodosStateContext);
  const { onDark, isDark } = useContext(
    TodosDispatchContext
  );

  let totalTodo = todo.length;
  let completeTodo = todo.filter((item) => {
    return item.isDone;
  }).length;
  let uncompleteTodo = totalTodo - completeTodo;

  const onClickDark = () => {
    onDark();
  };

  return (
    <div className="Header">
      <div className="TodoLengthText">
        <div className="DateHeader">
          <div className="DateHeader_1"></div>
          <div className="DateHeader_2">{today}</div>
          <div className="DateHeader_3">
            <span
              className="darkModeButton"
              onClick={onClickDark}
            >
              {isDark ? "🌙" : "☀️"}
            </span>
          </div>
        </div>

        <div className="HeaderContent">
          <h1>
            {hour}:{min2}:{sec2}
          </h1>

          <h2 className="title">
            당신의 알을 깨워보세요! 🐣
          </h2>
          <div></div>
          <div className="summary">
            🥚 총 <strong>{totalTodo}</strong>개 중<br />
            🐥 <strong>{completeTodo}</strong>마리의
            병아리가 부화했어요.
          </div>

          <div className="waiting">
            아직 🐣 <strong>{uncompleteTodo}</strong>개의
            알이 기다리고 있어요.
          </div>

          <div className="inspire">
            ✨ 당신의 손길로 생명을 불어넣어 주세요!
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
