import { Controller, Get, Param,Req,UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Request } from 'express';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getMyUser(@Param() params: {id: number}, @Req() req: Request){
       return this.userService.getMyUser(Number(params.id), req)
    }

    @Get()
    getUsers(){
       return this.userService.getUsers();
    }
}
