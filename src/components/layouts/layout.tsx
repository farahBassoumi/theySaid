import React from "react";
import { Outlet } from "react-router-dom";

//TODO change spelling
const Layout: React.FC = () => {
  return (
    <div className="flex overflow-visible ">
      <div className="flex-shrink-0 flex lg:flex overflow-visible z-10 ">
        Sidebar
      </div>
      <div
        style={{  }}
        className="flex flex-col w-full lg:w-[80%] h-full overflow-hidden"
      >
        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4">
          <Outlet />
        </main>

        {/* Footer */}
        Footer 
      </div>
    </div>
  );
};

export default Layout;
