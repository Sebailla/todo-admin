import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";

export const metadata = {
    title: 'To-Dos',
    description: 'Listado de To-Dos',
};

export const RestTodosPage = async () => {

    const todos = await prisma.todo.findMany({
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