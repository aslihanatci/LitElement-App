import { Router } from '@vaadin/router';

export const initRouter = (outlet) => {
  const router = new Router(outlet);

  router.setRoutes([
    { path: '/', component: 'employee-list' },
    { path: '/employees', component: 'employee-list' },
    { path: '/add', component: 'employee-add' },
    {
      path: '/edit/:id',
      action: async (context) => {
        const { id } = context.params; // Router'dan ID'yi al
        await import('./components/employee-edit.js'); // Employee-edit bileşenini yükle
        const component = document.createElement('employee-edit'); // Bileşeni oluştur
        component.employeeId = id; // Bileşene ID'yi aktar
        return component; // Bileşeni döndür
      },
    },
    { path: '/delete/:id', component: 'employee-delete' },
  ]);
};
