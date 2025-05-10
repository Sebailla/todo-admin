export const dynamic = 'force-dynamic';

import { getUserSessionServer } from "@/auth/actions/Auth-Actions";
import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";
import { redirect } from "next/navigation";


export const metadata = {
    title: 'To-Dos',
    description: 'Listado de To-Dos',
};

const RestTodosPage = async () => {

    const user = await getUserSessionServer()

    if (!user){
        redirect('/api/auth/signin')
    }

    const todos = await prisma.todo.findMany({
        where: {
            userId: user.id
        },
        orderBy: {
            createdAt: 'asc'
        }
    })

    return (
        <div>
            <div className="w-full px-5 mx-5 mb-10 mt-5">
                <NewTodo/>
            </div>
            
            <TodosGrid todos={todos}/>
        </div>
    )
}

export default RestTodosPage;