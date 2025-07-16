import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { consumer } from '../../admin.data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userauth',
  imports: [CommonModule, FormsModule],
  templateUrl: './userauth.component.html',
  styleUrl: './userauth.component.css',
})
export class UserauthComponent {
  isuserlogin: boolean = false;
  service = inject(UserService);
  router = inject(Router);
  toggle() {
    this.isuserlogin = !this.isuserlogin;
    console.log(this.isuserlogin);
  }
  onSignup(data: consumer) {
    const store = this.service.getUserStore();
    const allConsumers = store.consumer.all || [];
    const newId =
      allConsumers.length > 0
        ? Math.max(...allConsumers.map((c) => c.id || 0)) + 1
        : 1;

    const newConsumer: consumer = {
      ...data,
      id: newId,
    };
    const updatedConsumers = [...allConsumers, newConsumer];
    this.service.consumers.set(updatedConsumers);
    this.service.isConsumerLoggedIn.set(true);
    this.service.saveConsumerState(updatedConsumers, newConsumer);

    this.router.navigate(['/']); // or user dashboard
  }

  onlogin(data: consumer) {
    const all = this.service.getUserStore().consumer.all;
    const match = all.find(
      (user) => user.email === data.email && user.password === data.password
    );

    if (match) {
      this.service.isConsumerLoggedIn.set(true);
      this.service.saveConsumerState(all, match);
      this.router.navigate(['/']); // or user home
    } else {
      alert('Invalid credentials');
    }
  }
}
