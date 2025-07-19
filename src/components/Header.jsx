import "./Header.css";

const Header = () => {
  const today = new Date().toLocaleDateString("kr", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
  return (
    <div className="Header">
      <h4>오늘은✨</h4>
      <h2>{today}</h2>
    </div>
  );
};
export default Header;
