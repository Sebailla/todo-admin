import { Todo } from '@/generated/prisma'
import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'
import * as yup from 'yup'


interface Segment {
    params: {
        id: string
    }
}

const getById = async (id: string): Promise<Todo | null> => {
    const data = await prisma.todo.findFirst({ where: { id } })
    return data

}


export async function GET(request: Request, { params }: Segment) {

    const todoById = await getById(params.id)

    if (!todoById) {
        return NextResponse.json({
            status: 'error',
            error: 'Todo not found',
            msg: `Todo with id: ${params.id}, not found`
        }, { status: 404 })
    }

    return NextResponse.json({
        status: 'success',
        todoById
    })
}


//? Schema de validacion de PATCH
const updateSchema = yup.object({
    description: yup.string().optional(),
    complete: yup.boolean().optional().default(false),
})

export async function PATCH(request: Request, { params }: Segment) {

    const todoById = await getById(params.id)

    if (!todoById) {
        return NextResponse.json({
            status: 'error',
            error: 'Todo not found',
            msg: `Todo with id: ${params.id}, not found`
        }, { status: 404 })
    }

    try {

        const { complete, description } = await updateSchema.validate(await request.json())

        const updateTodo = await prisma.todo.update({
            where: {
                id: params.id
            },
            data: {
                complete,
                description
            }
        })

        return NextResponse.json({
            status: 'success',
            updateTodo
        })

    } catch (error) {
        return NextResponse.json({
            status: 'error',
            error: error.errors
        }, { status: 400 })

    }

}