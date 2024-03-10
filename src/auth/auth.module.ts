import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";


@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports:[PrismaModule,JwtModule,PassportModule]
    
})
export class AuthModule {}