'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export const toggleTodos = async (id: string, complete: boolean) => {
    const todo = await prisma.todo.findFirst({
        where: {
            id
        }
    })
    if (!todo) {
        throw new Error(`Todo with id:${id} not found`)
    }

    const updatedTodo = await prisma.todo.update({
        where: {
            id
        },
        data: {
            complete
        }
    })

    revalidatePath("/dashboard/server-todos")

    return updatedTodo
}

export const createTodo = async (description: string, userId: string) => {
    const todo = await prisma.todo.create({
        data: {
            description,
            userId: '...'
        }
    })

    revalidatePath("/dashboard/server-todos")

    return todo
}


export const deleteCompleted = async () => {
    await prisma.todo.deleteMany({
        where: {
            complete: true
        }
    })

    revalidatePath("/dashboard/server-todos")

    return true
}

