import { Injectable } from '@nestjs/common';
import { PractitionerDto } from './dto/pac.dto';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class PractitionerService {
  constructor(private prisma: PrismaService){}

  async findAll(): Promise<PractitionerDto[]>{
    return this.prisma.practitioner.findMany();
  }

  async findOne(id: number): Promise<PractitionerDto | null> {
    return this.prisma.practitioner.findUnique({
      where: { id },
    });
  }

  async create(data: PractitionerDto): Promise<PractitionerDto> {
    return this.prisma.practitioner.create({ data:{
      ...data,
      dob: new Date(data.dob),
    } });
  }

  async update(id: number, data: PractitionerDto): Promise<PractitionerDto> {
    return this.prisma.practitioner.update({
      where: { id },
      data: {
        ...data,
        dob: new Date(data.dob),
      },
    });
  }

  async delete(id:number): Promise<void>{
    await this.prisma.practitioner.delete({
      where:{id},
    })
  }
  
}
