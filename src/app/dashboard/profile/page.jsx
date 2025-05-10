'use client'

import { useSession } from "next-auth/react"
import Image from "next/image"

const Profile = () => {

    const { data: session } = useSession()

    return (
        <div className="flex flex-col p-5">
            <span>{session?.user.name ?? 'No Name'}</span>
            <span>{session?.user.email ?? 'No Email'}</span>
            <Image
                src={session?.user.image}
                alt={session?.user.name || '/images/user-profile.png'}
                width={100}
                height={100}
                className="rounded-full m-5"
            />
            <span><b>ID:</b> {session?.user.id}</span>
            <span><b>Role:</b> {session?.user.roles}</span>
        </div>
    )
}

export default Profile