
import { CiBookmarkCheck, CiCalendarDate, CiLogout, CiViewList } from 'react-icons/ci'
import Link from 'next/link'
import Image from 'next/image'
import { SidebarItem } from './SidebarItem'

const menuItem = [
  {
    icon: <CiCalendarDate size={30} />,
    href: '/dashboard',
    title: 'Dashboard'
  },
  {
    icon: <CiBookmarkCheck size={30} />,
    href: '/dashboard/rest-todos',
    title: 'Rest-ToDos'
  },
  {
    icon: <CiViewList size={30} />,
    href: '/dashboard/server-todos',
    title: 'Server Actions'
  },
]

export const Sidebar = () => {
  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          {/* TODO: Next/Link hacia dashboard */}
          <Link href="/dashboard" title="home" >
            {/* Next/Image */}
            <Image
              src="/logo.jpeg"
              alt="tailus logo"
              width={48}
              height={48}
            />
          </Link>
        </div>

        <div className="mt-8 text-center">
          {/* Next/Image */}
          <Image
            src="/IMG_0599.jpg"
            alt="user-image"
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
            width={64}
            height={64}
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">Sebastián A. Illa</h5>
          <span className="hidden text-gray-400 lg:block">Admin</span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">

          {
            menuItem.map((item, index) => (
              <SidebarItem key={index} {...item} />
            ))
          }

        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
          <CiLogout />
          <span className="group-hover:text-gray-700">Logout</span>
        </button>
      </div>
    </aside>
  )
}

//export default Sidebar