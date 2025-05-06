export const dynamic = 'force-dynamic';

import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";

export const metadata = {
    title: 'Server Actions',
    description: 'Server Actions de To-Dos',
};

const ServerTodosPage = async () => {

    const todos = await prisma.todo.findMany({
        orderBy: {
            createdAt: 'asc'
        }
    })

    return (
        <>
            <span className="text-2xl text-violet-700">Server Actions</span>
            <div className="w-full px-5 mx-5 mb-10 mt-5">
                <NewTodo />
            </div>

            <TodosGrid todos={todos} />
        </>
    )
}

export default ServerTodosPage;