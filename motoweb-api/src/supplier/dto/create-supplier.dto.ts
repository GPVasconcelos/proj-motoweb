import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSupplierDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  fantasyName: string;

  @IsNotEmpty()
  @IsString()
  cnpj: string;

  @IsNotEmpty()
  @IsString()
  operation: string;
}
