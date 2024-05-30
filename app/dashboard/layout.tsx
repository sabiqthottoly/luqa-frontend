import Header from "../ui/dashboard/header";
import SideNav from "../ui/dashboard/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <div className="flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex flex-col flex-grow py-4 ">
        <Header /> {/* Place Header here so it is above the main content */}
        <div className="flex-grow p-6 md:overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
