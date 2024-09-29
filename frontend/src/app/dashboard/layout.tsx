import { getUserInfo } from "@/actions/user-info/get-user-info.action";
import { Navbar, Sidebar} from "@/components";

export default async function DashboardLayout({children}: {children: React.ReactNode;}){
  
  const user = await getUserInfo();
  
  return (
    <div className="flex h-screen bg-gray-100">

      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar 
          user={user}
        />

        {/* Main content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container px-6 py-8 mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}