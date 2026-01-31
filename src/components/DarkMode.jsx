import "../App.css";

function DarkModeToggle() {
  const toggleDark = () => {
    document.body.classList.toggle("dark");
  };

  return <button onClick={toggleDark}>Toggle Dark Mode</button>;
}

export default DarkModeToggle;
