import { Injectable, signal } from '@angular/core';
import { consumer, UserStore } from '../../admin.data';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  consumers = signal<consumer[]>([]);
  isConsumerLoggedIn = signal(false);

  constructor() {
    const stored = localStorage.getItem('user');
    if (stored) {
      const parsed: UserStore = JSON.parse(stored);
      const allConsumers = parsed?.consumer?.all || [];
      const loggedIn = parsed?.consumer?.loggedin;

      this.consumers.set(allConsumers);
      if (loggedIn) this.isConsumerLoggedIn.set(true);
    }
  }

  saveConsumerState(all: consumer[], loggedin: consumer | null) {
    const existing = localStorage.getItem('user');
    let parsed: UserStore = {
      admin: { all: [], loggedin: null },
      consumer: { all: [], loggedin: null },
    };

    if (existing) parsed = JSON.parse(existing);

    parsed.consumer = {
      all,
      loggedin,
    };

    localStorage.setItem('user', JSON.stringify(parsed));
  }

  getUserStore(): UserStore {
    const user = localStorage.getItem('user');
    return user
      ? JSON.parse(user)
      : {
          admin: { all: [], loggedin: null },
          consumer: { all: [], loggedin: null },
        };
  }
}
