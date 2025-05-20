import { IsOptional, IsString } from 'class-validator';

export class UpdateClientDto {
  @IsOptional()
  @IsString()
  cnpj?: string;

  @IsOptional()
  @IsString()
  stateReg?: string;

  @IsOptional()
  @IsString()
  fantasyName?: string;

  @IsOptional()
  @IsString()
  sector?: string;
}
