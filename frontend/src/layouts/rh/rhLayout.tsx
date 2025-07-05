import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { RecruiterBreadcrumb } from "./RecruiterBreadcrumb";

export const RHLayout = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow px-6 py-4">
          <RecruiterBreadcrumb />
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

