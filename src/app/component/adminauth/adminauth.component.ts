import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { admin, adminlogin } from '../../admin.data';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin/admin.service';

@Component({
  selector: 'app-adminauth',
  imports: [CommonModule, FormsModule],
  templateUrl: './adminauth.component.html',
  styleUrl: './adminauth.component.css',
})
export class AdminauthComponent {
  route = inject(Router);
  admin = inject(AdminService);
  isadminlogin = this.admin.isadmin();
  loggedinadmins: adminlogin[] = [];

  // first try given not succeeded
  // onSignup(data: admin) {
  //   if (data) {
  //     this.admin.admindata.update((admins) => [...admins, data]);
  //   }
  //   // console.log(this.admin.admindata());
  //   this.admin.iadminloggedin.set(true);
  //   localStorage.setItem('admin', JSON.stringify(this.admin.admindata()));
  //   this.route.navigate(['/admindashboard']);
  // }

  onSignup(data: admin) {
    if (data) {
      const userStore = this.admin.getUserStore();
      const allAdmins = userStore.admin.all || [];
      const newId =
        allAdmins.length > 0
          ? Math.max(...allAdmins.map((a) => a.id || 0)) + 1
          : 1;
      const newAdmin: admin = {
        ...data,
        id: newId,
      };

      const updatedAdmins = [...userStore.admin.all, newAdmin];

      this.admin.admindata.set(updatedAdmins);
      this.admin.saveAdminState(updatedAdmins, newAdmin);
      this.admin.iadminloggedin.set(true);
      this.route.navigate(['/admindashboard']);
    }
  }

  toggle() {
    this.admin.isadmin.set(!this.admin.isadmin());
    this.isadminlogin = this.admin.isadmin();
  }
  //first try given
  // onLogin(data: adminlogin) {
  //   // console.log(this.loggedinadmins);
  //   const storedAdmins = localStorage.getItem('admin');

  //   if (storedAdmins) {
  //     this.loggedinadmins = JSON.parse(storedAdmins);

  //     const isValidAdmin = this.loggedinadmins.some(
  //       (admin) =>
  //         admin.email === data.email && admin.password === data.password
  //     );

  //     if (isValidAdmin) {
  //       console.log('Login successful');
  //       // You can set session, redirect, etc.
  //       localStorage.setItem('Loggedinadmin', JSON.stringify(data));
  //       this.admin.iadminloggedin.set(true);
  //       this.route.navigate(['/admindashboard']);
  //     } else {
  //       alert('invalid credetials');
  //       console.log('Invalid credentials');
  //     }
  //   } else {
  //     console.log('No admin data found in localStorage');
  //   }
  // }

  onLogin(data: adminlogin) {
    const userStore = this.admin.getUserStore();
    const allAdmins = userStore.admin.all;

    const matchedAdmin = allAdmins.find(
      (admin) => admin.email === data.email && admin.password === data.password
    );

    if (matchedAdmin) {
      console.log('Login successful');
      this.admin.saveAdminState(allAdmins, matchedAdmin);
      this.admin.iadminloggedin.set(true);
      this.route.navigate(['/admindashboard']);
    } else {
      alert('Invalid credentials');
    }
  }
}
