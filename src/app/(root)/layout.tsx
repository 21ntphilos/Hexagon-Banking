import SideBar from "../components/SideBar";
import Image from "next/image";
import Mobilenavbar from "../components/Mobilenavbar"
import { getLoggedInUser } from "@/lib/actions/userAction";
export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {


    const loggedinUser = await getLoggedInUser()
    return (
        <main className="flex w-full h-screen font-inter">
            <SideBar user={loggedinUser}/>
            <div className="flex size-full flex-col">
                <div className="root-layout">
                    <Image 
                    src="/icons/logo.svg" 
                    alt="menu icon" 
                    width={30} 
                    height={30}/>
                    <div>
                        <Mobilenavbar user={loggedinUser}/>
                    </div>
                </div>
            {children}
            </div>
        </main>
    );
}
