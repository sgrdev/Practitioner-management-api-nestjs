import { IsEmail, IsNotEmpty, IsString, IsArray, ArrayNotEmpty, ArrayUnique, IsDate, IsDateString } from 'class-validator';


export class PractitionerDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  contact: string;

  @IsNotEmpty()
  @IsDateString() 
  dob: Date;
  
  
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  workingDays: string[];

  @IsNotEmpty()
  startTime: string;

  @IsNotEmpty()
  endTime: string;

  address?: string;
}



