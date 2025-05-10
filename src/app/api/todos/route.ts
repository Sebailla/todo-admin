import { getUserSessionServer } from '@/auth/actions/Auth-Actions'
import prisma from '@/lib/prisma'
import { NextResponse} from 'next/server'
import * as yup from 'yup'

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url)
    const take = Number(searchParams.get('take') ?? '10')
    const skip = Number(searchParams.get('skip') ?? '0')

    if (isNaN(take)) {
        return NextResponse.json({
            status: 'error',
            error: 'Invalid take parameter',
            msg: 'Take must be a number'
        }, { status: 400 })
    }

    if (isNaN(skip)) {
        return NextResponse.json({
            status: 'error',
            error: 'Invalid skip parameter',
            msg: 'Skip must be a number'
        }, { status: 400 })
    }

    const todos = await prisma.todo.findMany({
        take: take,
        skip: skip,
        orderBy: {
            createdAt: 'desc'
        }
    })

    return NextResponse.json({
        status: 'success',
        todos
    })
}


//? Schema de validacion de POST
const postSchema = yup.object({
    description: yup.string().required(),
    complete: yup.boolean().optional().default(false),
})

export async function POST(request: Request) {

    const user = await getUserSessionServer()

    if (!user) {
        return NextResponse.json('Unauthorized',{status: 401})
    }

    try {
        const { description, complete } = await postSchema.validate(await request.json())

        const newTodo = await prisma.todo.create({
            data: {description, complete, userId: user.id}
        })

        return NextResponse.json({
            status: 'success',
            newTodo
        })

    } catch (error: any) {
        return NextResponse.json({
            status: 'error',
            msg: error.message
        }, { status: 400 })
    }

}


export async function DELETE(request: Request) {

    const user = await getUserSessionServer()

    if (!user) {
        return NextResponse.json('Unauthorized',{status: 401})
    }

    try {

        const delTodos = await prisma.todo.deleteMany({
            where: {
                complete: true,
                userId: user.id
            }
        })

        return NextResponse.json({
            status: 'success',
            meg: 'Todos eliminados',
            delTodos
        })

    } catch (error: any) {
        return NextResponse.json({
            status: 'error',
            msg: error.message
        }, { status: 400 })
    }

}