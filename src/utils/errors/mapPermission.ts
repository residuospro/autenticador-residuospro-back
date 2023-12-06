import { Permissions } from "../enum";

class PermissionMapper {
  private static creatablePermissions: Record<Permissions, Permissions[]> = {
    [Permissions.ADMIN]: [Permissions.MANAGER],
    [Permissions.MANAGER]: [Permissions.COLLABORATOR],
    [Permissions.SUPPORT]: [Permissions.ADMIN],
    [Permissions.COLLABORATOR]: [Permissions.COLLABORATOR],
    [Permissions.MASTER]: [Permissions.SUPPORT],
  };

  static getCreatablePermission(userPermission: string): Permissions[] {
    const mappedPermissions =
      PermissionMapper.creatablePermissions[userPermission as Permissions];

    if (mappedPermissions) {
      return mappedPermissions;
    } else {
      throw new Error("Você não possui permissão para criar usuários");
    }
  }
}

export default PermissionMapper;
