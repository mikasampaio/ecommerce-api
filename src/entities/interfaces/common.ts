export enum UserType {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface Status {
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}
