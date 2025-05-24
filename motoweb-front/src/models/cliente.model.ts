export interface Cliente {
  id: number;
  userId: number;
  cnpj: string;
  stateReg?: string | null;
  fantasyName: string;
  sector: string;
  createdAt: Date;
  updatedAt: Date;
}
