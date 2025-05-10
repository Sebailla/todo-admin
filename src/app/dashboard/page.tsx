import { WidgetItem } from "@/components";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Image from "next/image";



const DashboardPage = async () => {

  const session = await getServerSession(authOptions)
  if(!session){
    redirect('/api/auth/signin')
  }

  return (
    <div className="grid gap-6 grig-cols-1 sm:grid-cols-2  ">

      <WidgetItem title="User Server Side">
        <div className="flex flex-col p-5">
          <span><b>Name:</b>  {session.user.name}</span>
          <span><b>Email:</b> {session.user.email}</span>
          <Image
            src={session.user.image || '/images/user-profile.png'}
            alt={session.user.name}
            width={100}
            height={100}
            className="rounded-full my-5"
          />
          <span><b>ID:</b> {session.user.id}</span>
          <span><b>Role:</b> {session.user.roles}</span>
        </div>
        <div>
          {JSON.stringify(session)}
        </div>
      </WidgetItem>

    </div>
  )
}

export default DashboardPage;