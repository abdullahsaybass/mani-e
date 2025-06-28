const Topbar = () => {
  return (
    <header className="topbar">
      <input className="search-input" placeholder="Search here..." />
      <div className="topbar-icons">
        <span className="icon">🔔</span>
        <span className="icon">🌐</span>
        <span className="icon">👤 Kristin Watson</span>
      </div>
    </header>
  );
};

export default Topbar;