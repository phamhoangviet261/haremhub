import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'Trang chủ',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  // {
  //   title: 'user',
  //   path: '/dashboard/user',
  //   icon: getIcon(peopleFill)
  // },
  {
    title: 'anime',
    path: '/dashboard/anime',
    icon: getIcon(shoppingBagFill)
  },
  {
    title: 'manga',
    path: '/dashboard/manga',
    icon: getIcon(shoppingBagFill)
  },
  {
    title: 'Me',
    path: '/me',
    icon: getIcon(alertTriangleFill)
  },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: getIcon(lockFill)
  // },
  // {
  //   title: 'register',
  //   path: '/register',
  //   icon: getIcon(personAddFill)
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon(alertTriangleFill)
  // }
];

export default sidebarConfig;
