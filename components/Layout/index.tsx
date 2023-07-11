import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="mx-auto px-4">
      <header className="py-4">CRM Kanban Experiment</header>
      <main>{children}</main>
      <footer className="py-4">
        © {new Date().getFullYear()} James Hunter
      </footer>
    </div>
  );
};

export default Layout;
