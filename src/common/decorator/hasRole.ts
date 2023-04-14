import { SetMetadata } from '@nestjs/common';
import { Role } from '../enum/role';

export const HasRole = (role: Role) => SetMetadata('role', role);
