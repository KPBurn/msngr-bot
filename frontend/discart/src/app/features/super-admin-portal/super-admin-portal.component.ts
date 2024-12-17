import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-super-admin-portal',
  templateUrl: './super-admin-portal.component.html',
  styleUrls: ['./super-admin-portal.component.scss'],
})
export class SuperAdminPortalComponent {
  navLink = [
    {
      header: 'Menu',
      links: [
        {
          label: 'Customers',
          route: 'customers',
          icon: 'shopping_bag',
          isPopup: false,
        },
        {
          label: 'Campaigns',
          route: 'campaigns',
          icon: 'bookmark',
          isPopup: false,
        },
        {
          label: 'My Clients',
          route: 'clients',
          icon: 'description',
          isPopup: false,
        },
        {
          label: 'My Brands',
          route: 'brands',
          icon: 'schedule',
          isPopup: false,
        },
        {
          label: 'My Store',
          route: 'store',
          icon: 'store',
          isPopup: false,
        },
      ],
    },
  ];

  isOpen = true;

  isHandset$ = new BehaviorSubject<boolean>(false);

  logoutClick() {
    //LOADING
    // setTimeout(() => {
    //   //SUCCESS
    //   // this.storeService.setStore({ type: 'CLEAR_STORE' });
    //   // localStorage.removeItem('BEARER_TOKEN');
    //   // localStorage.removeItem('SESSION_TOKEN');
    //   // this.router.navigate(['/auth/super-admin/login']);
    // }, 2000);
  }
}
