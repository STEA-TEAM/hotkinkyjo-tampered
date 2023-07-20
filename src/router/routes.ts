export const routes = [
  {
    path: '/members/index.php',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'index',
        path: '',
        components: {
          default: () => import('pages/DownloadPage.vue'),
        },
      },
    ],
  },
];
