import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className={`netflix-header d-flex align-items-center justify-content-between ${scrolled ? "scrolled" : ""}`}>
      <div className="d-flex align-items-center">
        <NavLink to="/" className="netflix-brand me-4 me-lg-5">
          MovieExplorer
        </NavLink>

        <nav className="d-none d-md-flex align-items-center">
          <NavLink to="/" className={({ isActive }) => `netflix-nav-link ${isActive && location.pathname === '/' ? 'active' : ''}`}>
            Home
          </NavLink>
          <NavLink to="/trending" className={({ isActive }) => `netflix-nav-link ${isActive ? 'active' : ''}`}>
            Trending
          </NavLink>
          <NavLink to="/top-rated" className={({ isActive }) => `netflix-nav-link ${isActive ? 'active' : ''}`}>
            Top Rated
          </NavLink>
          <NavLink to="/coming-soon" className={({ isActive }) => `netflix-nav-link ${isActive ? 'active' : ''}`}>
            Coming Soon
          </NavLink>
          <NavLink to="/my-list" className={({ isActive }) => `netflix-nav-link ${isActive ? 'active' : ''}`}>
            My List
          </NavLink>
        </nav>
      </div>

      <div className="d-flex align-items-center gap-3">
        <form onSubmit={handleSearchSubmit} className={`netflix-search-wrap ${searchOpen ? "open" : ""}`}>
          <button
            type="button"
            className="netflix-search-icon-btn"
            onClick={() => setSearchOpen(!searchOpen)}
            title="Search"
          >
            <i className="bi bi-search"></i>
          </button>
          <input
            type="text"
            className="netflix-search-input"
            placeholder="Titles, people, genres..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onBlur={() => {
              if (!searchQuery) setSearchOpen(false);
            }}
          />
        </form>

        <div className="position-relative">
          <button
            className="btn text-white p-1 position-relative"
            onClick={() => setShowNotifications(!showNotifications)}
            title="Notifications"
          >
            <i className="bi bi-bell-fill fs-5"></i>
            <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
              <span className="visually-hidden">New alerts</span>
            </span>
          </button>

          {showNotifications && (
            <div
              className="position-absolute end-0 mt-2 p-3 bg-dark border border-secondary rounded shadow-lg"
              style={{ width: "280px", zIndex: 1050 }}
            >
              <h6 className="text-white border-bottom pb-2 mb-2">Notifications</h6>
              <div className="d-flex align-items-center gap-2 mb-2">
                <i className="bi bi-film text-danger fs-4"></i>
                <div className="small text-light">
                  <strong>New Arrival:</strong> Top Trending Movies added to your list!
                </div>
              </div>
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-star-fill text-warning fs-4"></i>
                <div className="small text-light">
                  <strong>Recommendation:</strong> Explore Top Rated releases today.
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="position-relative">
          <div
            className="d-flex align-items-center gap-1 cursor-pointer"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            style={{ cursor: "pointer" }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
              alt="Profile"
              className="rounded"
              style={{ width: "32px", height: "32px", objectFit: "cover" }}
            />
            <i className="bi bi-caret-down-fill text-white small"></i>
          </div>

          {showProfileMenu && (
            <div
              className="position-absolute end-0 mt-2 py-2 bg-dark border border-secondary rounded shadow-lg text-light"
              style={{ width: "200px", zIndex: 1050 }}
            >
              <div className="px-3 py-2 border-bottom d-flex align-items-center gap-2">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                  alt="User"
                  style={{ width: "24px", height: "24px" }}
                />
                <span className="small fw-bold text-truncate">User Profile</span>
              </div>
              <NavLink to="/my-list" className="dropdown-item px-3 py-2 text-light small hover-bg-secondary" onClick={() => setShowProfileMenu(false)}>
                <i className="bi bi-bookmark-heart me-2"></i> My Watchlist
              </NavLink>
              <a href="#account" className="dropdown-item px-3 py-2 text-light small hover-bg-secondary" onClick={(e) => { e.preventDefault(); setShowProfileMenu(false); }}>
                <i className="bi bi-person me-2"></i> Account
              </a>
              <a href="#help" className="dropdown-item px-3 py-2 text-light small hover-bg-secondary" onClick={(e) => { e.preventDefault(); setShowProfileMenu(false); }}>
                <i className="bi bi-question-circle me-2"></i> Help Center
              </a>
              <hr className="dropdown-divider bg-secondary my-1" />
              <button
                className="dropdown-item px-3 py-2 text-danger small hover-bg-secondary w-100 text-start border-0 bg-transparent"
                onClick={() => setShowProfileMenu(false)}
              >
                <i className="bi bi-box-arrow-right me-2"></i> Sign out of MovieExplorer
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};