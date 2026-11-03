import React from "react";

// Reuse the same simple line icons so navigation stays consistent across pages.
export function NavigationIcon({ kind }) {
  return (
    <svg
      className="navigation-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {kind === "home" ? (
        <>
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5.5 9v11h13V9M9.5 20v-7h5v7" />
        </>
      ) : (
        <>
          <path d="M3 7V5.5A1.5 1.5 0 0 1 4.5 4H9l2 3h8.5A1.5 1.5 0 0 1 21 8.5v10a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5V7Z" />
          <path d="M14 10v6l2-1.5 2 1.5v-6z" />
        </>
      )}
    </svg>
  );
}

// These are independent destinations, not a breadcrumb or a sequence of steps.
export function WorkspaceNavigation({ onHome, onSaved, children }) {
  return (
    <nav className="workspace-nav" aria-label="Page navigation">
      <button className="workspace-nav-button" type="button" onClick={onHome}>
        <NavigationIcon kind="home" />
        <span>Home</span>
      </button>
      <button className="workspace-nav-button" type="button" onClick={onSaved}>
        <NavigationIcon kind="saved" />
        <span>Saved stories</span>
      </button>
      {children}
    </nav>
  );
}
