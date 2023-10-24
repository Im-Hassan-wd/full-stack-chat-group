import "./Searchbar.css";

export default function Searchbar() {
  return (
    <div className="searchbar">
      <div className="searchbar-container">
        <span className="material-symbols-outlined">search</span>
        <input type="text" placeholder="Search" />
      </div>
    </div>
  );
}
