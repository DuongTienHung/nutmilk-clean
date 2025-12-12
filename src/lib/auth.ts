export type UserRole = 'admin' | 'warehouse_manager' | 'purchasing' | 'production' | 'warehouse_staff';

export interface User {
  id: string;
  username: string;
  name: string;
  role: UserRole;
  email: string;
  avatar?: string;
}

// Demo users
export const DEMO_USERS: Record<string, User> = {
  'a': {
    id: '1',
    username: 'a',
    name: 'Nguyễn Văn Admin',
    role: 'admin',
    email: 'admin@nutmilk.vn',
  },
  'b': {
    id: '2',
    username: 'b',
    name: 'Trần Thị Kho',
    role: 'warehouse_manager',
    email: 'kho@nutmilk.vn',
  },
  'c': {
    id: '3',
    username: 'c',
    name: 'Lê Văn Mua',
    role: 'purchasing',
    email: 'muahang@nutmilk.vn',
  },
  'd': {
    id: '4',
    username: 'd',
    name: 'Phạm Thị Sản Xuất',
    role: 'production',
    email: 'sanxuat@nutmilk.vn',
  },
  'e': {
    id: '5',
    username: 'e',
    name: 'Hoàng Văn Kho',
    role: 'warehouse_staff',
    email: 'nvkho@nutmilk.vn',
  },
};

export const ROLE_LABELS: Record<UserRole, string> = {
  admin: 'Quản trị viên',
  warehouse_manager: 'Quản lý kho',
  purchasing: 'Nhân viên mua hàng',
  production: 'Nhân viên sản xuất',
  warehouse_staff: 'Nhân viên kho',
};

export const ROLE_DASHBOARDS: Record<UserRole, string> = {
  admin: '/admin',
  warehouse_manager: '/warehouse-manager',
  purchasing: '/purchasing',
  production: '/production',
  warehouse_staff: '/warehouse-staff',
};

export function authenticateUser(username: string, password: string): User | null {
  const user = DEMO_USERS[username.toLowerCase()];
  if (user && password.length > 0) {
    return user;
  }
  return null;
}
