import { Sidebar } from "@ui/Sidebar";
import { getUserInfo } from "../../actions/user-info/get-user-info.action";
import { Navbar } from "@ui/Navbar";


export default async function DashboardLayout({ children }: { children: React.ReactNode; }) {

  const user = await getUserInfo();

  return (
    <div className="flex h-screen bg-light-bg-secondary dark:bg-dark-bg-primary">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar user={user} />

        {/* Main content */}
        <div className="flex-1 flex justify-center overflow-y-auto bg-light-bg-primary dark:bg-dark-bg-secondary">
          <main className="w-full max-w-7xl am:px-4 sm:px-6 md:px-8 px-10">
            <div className="am:py-4 sm:py-6 md:py-8 py-10">
              <div className="w-full min-h-[calc(100vh-130px)] bg-light-bg-secondary dark:bg-dark-bg-container rounded-lg shadow-sm">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}