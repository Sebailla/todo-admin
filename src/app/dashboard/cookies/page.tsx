import { TabBar } from "@/components";
import { cookies } from "next/headers";

export const metadata = {
    title: 'Cookies Page',
    description: 'Cookies Page',
};

const CookiesPage = () => {

    const cookieStore = cookies()
    const cookieTab = cookieStore.get('selectedTab')?.value ?? '1'

    return (
        <section className="grid grid-cols-1">
            <div className="flex flex-col">
                <span className="text-3xl">Tabs</span>
                <TabBar currentTab={parseInt(cookieTab)}/>
            </div>
        </section>
    )
}

export default CookiesPage