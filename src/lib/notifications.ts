export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  link?: string;
}

export const DEMO_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    userId: '1', // admin
    title: 'Yêu cầu mua hàng mới',
    message: 'Có yêu cầu mua NVL từ bộ phận sản xuất',
    read: false,
    createdAt: '2024-12-15',
    link: '/purchasing/requests',
  },
  {
    id: 'n2',
    userId: '2', // warehouse manager
    title: 'Lô sắp hết hạn',
    message: 'Lô L001 sẽ hết hạn trong 3 ngày',
    read: false,
    createdAt: '2024-12-14',
    link: '/warehouse-manager/batches',
  },
];
