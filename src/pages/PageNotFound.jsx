import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export const PageNotFound = () => {
  useEffect(() => {
    document.title = "Lost Your Way? - MovieExplorer";
  }, []);

  return (
    <main
      className="min-vh-100 d-flex flex-column align-items-center justify-content-center text-center text-light px-3"
      style={{
        background: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url('https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="display-1 fw-bold text-white mb-2" style={{ fontSize: "6rem" }}>
        Lost Your Way?
      </h1>
      <p className="fs-4 text-light max-w-600 mb-4">
        We couldn't find that page. You'll find lots to explore on the home page.
      </p>
      <div className="d-flex align-items-center gap-3">
        <Link to="/" className="btn-netflix-primary fs-5 px-4 py-2">
          MovieExplorer Home
        </Link>
        <span className="border-start border-secondary h-100 mx-2"></span>
        <span className="text-secondary fw-bold">Error Code: MX-404</span>
      </div>
    </main>
  );
};