import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async getMyUser(id: number, req: Request) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        
        if(!user){
            throw new NotFoundException()
        }

        const decodedUser = req.user as {id:number, email:string}

        if( user.id !== decodedUser.id){
           throw new ForbiddenException() 
        }
        delete user.hash
        return { user };
    }


    async getUsers() {
        return await this.prisma.user.findMany({
            select: { id: true, email: true },
        });
    }

}
