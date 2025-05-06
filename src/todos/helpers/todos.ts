import { Todo } from "@/generated/prisma";

/* const sleep = (secons: number): Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true)
        }, secons * 1000)
    })
} */

export const updateTodo = async (id: string, complete: boolean): Promise<Todo> => {
    const body = { complete }
    const todo = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => res.json())

    return todo
}

export const createTodo = async (description: string): Promise<Todo> => {
    const body = { description }
    const todo = await fetch(`/api/todos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => res.json())

    return todo
}

export const deleteCompleteTodo = async (): Promise<boolean> => {

    await fetch(`/api/todos`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(res => res.json())

    return true

}