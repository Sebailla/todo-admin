

import { Sidebar } from '@/components'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function NotFound() {

    return (

        <>
            <Sidebar />
            <section className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen flex items-center  justify-center flex-col md:gap-28 gap-16">
                <div className="xl:pt-24 w-full xl:w-1/2 pb-12 lg:pb-0">
                    <div className="flex flex-col items-center justify-center">
                        <div className="absolute">
                            <div className="">
                                <h1 className="my-2 text-gray-800 font-bold text-2xl">
                                    Not Found
                                </h1>
                                <p className="my-2 text-gray-800">Sorry about that! Please visit our hompage to get where you need to go.</p>
                                <Link href="/dashboard">
                                    <button className="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">Take me there!</button>
                                </Link>


                            </div>
                        </div>
                        <div>
                            <Image src="https://i.ibb.co/G9DC8S0/404-2.png" alt=''
                                width={500}
                                height={500} />
                        </div>
                    </div>
                </div>
                <div>
                    <Image src="https://i.ibb.co/ck1SGFJ/Group.png" alt=''
                        width={500}
                        height={500} />
                </div>
            </section>
        </>

    )
}



