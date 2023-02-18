import Home from "./Home";
import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import SessionProvider from "../components/SessionProvider";
import LoginPage from "../components/LoginPage";


const Page = async () => {

    const session = await getServerSession(authOptions)


    return <SessionProvider session={session}>
        {
            session ? <Home /> : <LoginPage />
        }
    </SessionProvider>

}


export default Page;
