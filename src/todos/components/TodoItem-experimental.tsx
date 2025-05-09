import { Todo } from "@/generated/prisma"
import styles from "./TodoItem.module.css"
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5"
import { useOptimistic } from "react"


interface Props {
    todo: Todo
    toggleTodo: (id: string, complete: boolean) => Promise<Todo | void>
}

export const TodoItemExperimental = ({ todo, toggleTodo }: Props) => {

    //? useOptimistic ------------

    const [todoOptimistic, toggleOptimistic] = useOptimistic (
        todo,
        (state, newCompleteValue: boolean) => ({
            ...state,
            complete: newCompleteValue
        })
    )

    const onToggleTodo = async () => {
        toggleOptimistic(!todoOptimistic.complete)

        try {
            await toggleTodo(todoOptimistic.id, !todoOptimistic.complete)
        } catch (error) {
            toggleOptimistic(!todoOptimistic.complete)
            throw error
        }
        
    }
    
    //? ---------------------------



    return (
        <div className={todoOptimistic.complete ? styles.todoDone : styles.todoPending}>
            <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
                <div
                    onClick={() => onToggleTodo()}
                    className={
                        `flex p-1 rounded-md cursor-pointer
                    hover:bg-opacity-60
                    ${todoOptimistic.complete ? "bg-blue-100" : "    bg-red-100"}`
                    }>
                    {
                        todoOptimistic.complete
                            ?
                            <IoCheckboxOutline size={25} />
                            :
                            <IoSquareOutline size={25} />
                    }

                </div>
                <div className="text-center sm:text-left">
                    {todoOptimistic.description}
                </div>
            </div>
        </div>
    )
}
