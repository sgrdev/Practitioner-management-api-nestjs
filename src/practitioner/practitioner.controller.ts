import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { PractitionerService } from './practitioner.service';
import { PractitionerDto } from './dto/pac.dto';

@Controller('practitioner')
export class PractitionerController {
  constructor(private readonly practitionerService: PractitionerService) {}

  @Get()
  async findAll(): Promise<PractitionerDto[]> {
    return this.practitionerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<PractitionerDto | null> {
    return this.practitionerService.findOne(Number(id));
  }

  @Post('create')
  async create(@Body() practitionerDto: PractitionerDto): Promise<PractitionerDto> {
    return this.practitionerService.create(practitionerDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() practitionerDto: PractitionerDto): Promise<PractitionerDto> {
    return this.practitionerService.update(Number(id), practitionerDto);
  }
}
