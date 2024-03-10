import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from '@node-rs/argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { jwtSecret } from "./constants";
import { Response,Request } from "express";


@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) { }

  async signup(dto: AuthDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password);

    //save the user in database
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });
      delete user.hash
      //return the saved user
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Credentials taken'
          )
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthDto,req: Request, res: Response, ) {
    //find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      }
    })
    //if user does not exist throw exception
    if (!user)
      throw new ForbiddenException(
        'credential incorrect',
      )
    //compare password
    const pwMatches = await argon.verify(
      user.hash,
      dto.password,
    )
    //if password incorrect throw exception
    if (!pwMatches)
      throw new ForbiddenException(
        'incorrect password',
      )

    const token = await this.signToken({ id: user.id, email: user.email })
    
    if(!token){
      throw new ForbiddenException();
    }

    res.cookie('token', token);

    return res.send({
      message:"logged in successfully"
    })
    //send user
    delete user.hash;
    return user;
  }

  async signToken(args: { id: number, email: string }) {
    const payload ={
      id: args.id,
      email:args.email
    }

    return this.jwt.signAsync(args, { secret: jwtSecret })
  }
  async signout( req: Request, res: Response){
    res.clearCookie('token')
    return res.send({
      message:'logged out succefully'
    });
  }
}
