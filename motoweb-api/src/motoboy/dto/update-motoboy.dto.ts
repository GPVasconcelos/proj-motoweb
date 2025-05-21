import { PartialType } from '@nestjs/mapped-types';
import { CreateMotoboyDto } from './create-motoboy.dto';

export class UpdateMotoboyDto extends PartialType(CreateMotoboyDto) {}
