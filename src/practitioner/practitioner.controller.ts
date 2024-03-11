import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { PractitionerService } from './practitioner.service';
import { PractitionerDto } from './dto/pac.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
@Controller('practitioner')
export class PractitionerController {
  constructor(private readonly practitionerService: PractitionerService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<PractitionerDto[]> {
    return this.practitionerService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<PractitionerDto | null> {
    return this.practitionerService.findOne(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() practitionerDto: PractitionerDto): Promise<PractitionerDto> {
    return this.practitionerService.create(practitionerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() practitionerDto: PractitionerDto): Promise<PractitionerDto> {
    return this.practitionerService.update(Number(id), practitionerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void>{
    return this.practitionerService.delete(Number(id));
  }
  
}
