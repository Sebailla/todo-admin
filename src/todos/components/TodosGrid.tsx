'use client'
import { Todo } from "@/generated/prisma"
//import { TodoItem } from "./TodoItem"
//import * as todosApi from "../helpers/todos"
//import { useRouter } from "next/navigation"
import { toggleTodos } from "../actions/actions"
import { TodoItemExperimental } from "./TodoItem-experimental"

interface Props {
    todos?: Todo[] 
}

export const TodosGrid = ({todos = []}: Props) => {

    //const router = useRouter()

    /* const toggleTodos = async (id: string, complete: boolean) => {
        const updatedTodo = await todosApi.updateTodo(id, complete)
        router.refresh()
    } */

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {
                todos.map(todo => {
                    return (
                        /* <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodos}/> */
                        <TodoItemExperimental key={todo.id} todo={todo} toggleTodo={toggleTodos}/>
                    )
                })
            }
        </div>
    )
}
