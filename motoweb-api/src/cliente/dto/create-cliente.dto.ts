import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateClientDto {
  @IsNotEmpty()
  @IsString()
  userId: number;

  @IsNotEmpty()
  @IsString()
  cnpj: string;

  @IsOptional()
  @IsString()
  stateReg?: string;

  @IsNotEmpty()
  @IsString()
  fantasyName: string;

  @IsNotEmpty()
  @IsString()
  sector: string;
}
