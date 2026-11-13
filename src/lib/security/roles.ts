export const ADMIN_ROLES = ['super_admin', 'admin', 'editor', 'viewer'] as const;
export type AdminRole = (typeof ADMIN_ROLES)[number];

export const rolePermissions: Record<AdminRole, string[]> = {
  super_admin: ['dashboard', 'movies:read', 'movies:write', 'users:read', 'settings:write', 'audit:read', 'sync:write', 'invitations:write'],
  admin: ['dashboard', 'movies:read', 'movies:write', 'users:read', 'audit:read', 'sync:write', 'invitations:write'],
  editor: ['dashboard', 'movies:read', 'movies:write', 'sync:write'],
  viewer: ['dashboard', 'movies:read'],
};

export function can(role: AdminRole, permission: string) { return rolePermissions[role]?.includes(permission) ?? false; }
