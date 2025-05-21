export class UserEntity {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  profileType: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  deletedAt?: Date | null;
}
