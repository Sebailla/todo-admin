import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs';
import { create } from 'domain';

export async function GET(request: Request) {

    await prisma.todo.deleteMany()
    await prisma.user.deleteMany()

    const user = await prisma.user.create({
        data: {
            email: 'test1@gmail.com',
            password: bcrypt.hashSync('123456'),
            roles: ['user'],
            todos: {
                create: [
                    { description: 'Piedra del alma', complete: true },
                    { description: 'Piedra del tiempo' },
                    { description: 'Piedra del poder' },
                    { description: 'Piedra del espacio' },
                    { description: 'Piedra del realidad' },
                ]
            }
        }
    })

    /* await prisma.todo.createMany({
        data: [
            {description: 'Piedra del alma', complete: true},
            {description: 'Piedra del tiempo'},
            {description: 'Piedra del poder'},
            {description: 'Piedra del espacio'},
            {description: 'Piedra del realidad'},
        ]
    }) */

    return NextResponse.json({
        message: 'Seed route',
        status: 'success'
    })
}