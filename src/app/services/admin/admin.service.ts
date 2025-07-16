import { Injectable, signal } from '@angular/core';
import { admin, adminlogin, consumer, UserStore } from '../../admin.data';

@Injectable({
  providedIn: 'root',
})
// export class AdminService {
//   constructor() {
//     const logedinitem = localStorage.getItem('Loggedinadmin');
//     if (logedinitem) {
//       this.iadminloggedin.set(true);
//     }
//   }
//   isadmin = signal(false);
//   admindata = signal<admin[]>([]);

//   iadminloggedin = signal(false);
// }
export class AdminService {
  isadmin = signal(false);
  admindata = signal<admin[]>([]);
  iadminloggedin = signal(false);

  constructor() {
    const stored = localStorage.getItem('user');
    if (stored) {
      const parsed = JSON.parse(stored);
      const adminLoggedIn = parsed?.admin?.loggedin;
      const allAdmins = parsed?.admin?.all || [];
      if (adminLoggedIn) this.iadminloggedin.set(true);
      this.admindata.set(allAdmins);
    }
  }

  saveAdminState(allAdmins: admin[], loggedIn: admin | null) {
    const stored = localStorage.getItem('user');

    let parsed: UserStore = {
      admin: { all: [], loggedin: null },
      consumer: { all: [], loggedin: null },
    };

    if (stored) {
      parsed = JSON.parse(stored);
    }

    parsed.admin = {
      all: allAdmins,
      loggedin: loggedIn || null,
    };

    localStorage.setItem('user', JSON.stringify(parsed));
  }

  getUserStore(): {
    admin: { all: admin[]; loggedin: admin | null };
    consumer: { all: consumer[]; loggedin: consumer | null };
  } 
  {
    const user = localStorage.getItem('user');
    return user
      ? JSON.parse(user)
      : {
          admin: { all: [], loggedin: null },
          consumer: { all: [], loggedin: null },
        };
  }
}
