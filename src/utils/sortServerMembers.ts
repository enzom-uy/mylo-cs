import { User } from '@prisma/client'

export function sortServerMembers({
    admins,
    members
}: {
    admins: User[]
    members: User[]
}) {
    const uniqueArray: User[] = []

    // Agregar elementos del Array A
    for (let i = 0; i < admins.length; i++) {
        if (!uniqueArray.includes(admins[i])) {
            uniqueArray.push(admins[i])
        }
    }

    // Agregar elementos del Array B que no estén en el Array A
    for (let i = 0; i < members.length; i++) {
        if (!uniqueArray.includes(members[i])) {
            uniqueArray.push(members[i])
        }
    }

    return uniqueArray
}
