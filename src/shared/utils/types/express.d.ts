import { UserRole } from "src/features/user/interfaces/roles.interface";

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      _id: string;
      roles: UserRole[];
    };
  }
}
