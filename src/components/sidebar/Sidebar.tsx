
import { CiBookmarkCheck, CiCalendarDate, CiCoffeeCup, CiLogout, CiShoppingBasket, CiShoppingCart, CiUser, CiViewList } from 'react-icons/ci'
import Link from 'next/link'
import Image from 'next/image'
import { SidebarItem } from './SidebarItem'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import LogoutButton from './LogoutButton';

const menuItem = [
  {
    icon: <CiCalendarDate size={30} />,
    href: '/dashboard',
    title: 'Dashboard'
  },
  {
    icon: <CiUser size={30} />,
    href: '/dashboard/profile',
    title: 'Profile'
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
  {
    icon: <CiCoffeeCup size={30} />,
    href: '/dashboard/cookies',
    title: 'Cookies'
  },
  {
    icon: <CiShoppingBasket size={30} />,
    href: '/dashboard/products',
    title: 'Products'
  },
  {
    icon: <CiShoppingCart size={30} />,
    href: '/dashboard/cart',
    title: 'Cart'
  },
]

export const Sidebar = async () => {

  const session = await getServerSession(authOptions)


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
                  src={session?.user.image || '/images/user-profile.png'}
                  alt={session?.user.image && 'No Image'}
                  className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
                  width={64}
                  height={64}
                />
                <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{session?.user?.name}</h5>
                <span 
                className={`hidden text-gray-400 lg:block capitalize ${session?.user?.roles.includes('admin') ? "hidden text-red-400 lg:block capitalize font-bold" : ""}`}
                >
                  {session?.user?.roles || 'guest'}
                </span>
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
        <LogoutButton />
      </div>
    </aside>
  )
}

