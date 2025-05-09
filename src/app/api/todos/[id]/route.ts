import { getUserSessionServer } from '@/auth/actions/Auth-Actions'
import { Todo } from '@/generated/prisma'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import * as yup from 'yup'


interface Segment {
    params: {
        id: string
    }
}

const getById = async (id: string): Promise<Todo | null> => {

    const user = await getUserSessionServer()

    if (!user) {
        return null
    }

    const data = await prisma.todo.findFirst({ where: { id }})

    if (data?.userId !== user.id) {
        return null
    }

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


//? Schema de validacion de PUT
const updateSchema = yup.object({
    description: yup.string().optional(),
    complete: yup.boolean().optional().default(false),
})

export async function PUT(request: Request, { params }: Segment) {

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

    } catch (error: any) {
        return NextResponse.json({
            status: 'error',
            error: error.errors
        }, { status: 400 })

    }

}