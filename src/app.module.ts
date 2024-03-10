import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';
import { PractitionerModule } from './practitioner/practitioner.module';

@Module({
  imports: [AuthModule, UserModule, BookmarkModule, PrismaModule, PractitionerModule]
})
export class AppModule {}
