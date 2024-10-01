import { getUserInfo } from "@/actions/user-info/get-user-info.action";
import { Navbar, Sidebar } from "@/components";

export default async function DashboardLayout({ children }: { children: React.ReactNode; }) {

  const user = await getUserInfo();

  return (
    <div className="flex h-screen bg-gray-100">

      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar
          user={user}
        />

        {/* Main content */}
        <div className="h-full w-full bg-gray-50 relative overflow-y-auto">
          <main>
            <div className="pt-6 px-4">
              <div className="w-full min-h-[calc(100vh-230px)]">
                <div className=" p-4 sm:p-6 xl:p-8">
                  {children}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}