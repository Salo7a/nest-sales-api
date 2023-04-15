import { SetMetadata } from '@nestjs/common';
import { Role } from '../enum/role';

export const HasAnyRole = (roles: Role[]) => SetMetadata('roles', roles);
