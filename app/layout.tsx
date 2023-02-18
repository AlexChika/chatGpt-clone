import { getServerSession } from "next-auth"
import LoginPage from "../components/LoginPage"
import SessionProvider from "../components/SessionProvider"
import { authOptions } from "../pages/api/auth/[...nextauth]"
import "../styles/globals.css"
import AppLayOut from "./AppLayOut"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html>
      <head />
      <body>
        <SessionProvider session={session}>
          {
            session ? <AppLayOut >{children}</AppLayOut> : <LoginPage />
          }
        </SessionProvider>
      </body>
    </html>
  )
}
