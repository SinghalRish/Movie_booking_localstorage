import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AdminService } from '../../services/admin/admin.service';
import { admin } from '../../admin.data';
import { UserService } from '../../services/user/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  name? = '';
  adminservice = inject(AdminService);
  consumerservice = inject(UserService);
  route = inject(Router);
  isadminloggedin = this.adminservice.iadminloggedin;
  loggedinadmin = localStorage.getItem('Loggedinadmin');
  isuserloggedin = this.consumerservice.isConsumerLoggedIn;
  // logout() {
  //   localStorage.removeItem('Loggedinadmin');
  //   this.adminservice.iadminloggedin.set(false);
  //   this.route.navigate(['']);
  // }
  logoutadmin() {
    const userStore = this.adminservice.getUserStore();
    this.adminservice.saveAdminState(userStore.admin.all, null);
    this.adminservice.iadminloggedin.set(false);
    this.route.navigate(['']);
  }

  logoutuser() {
    const userStore = this.consumerservice.getUserStore();
    this.consumerservice.saveConsumerState(userStore.consumer.all, null);
    this.consumerservice.isConsumerLoggedIn.set(false);
    this.route.navigate(['']);
  }

  // ngOnInit(): void {
  //   const loggedInAdminStr = localStorage.getItem('Loggedinadmin');
  //   const allAdminsStr = localStorage.getItem('admin');

  //   if (loggedInAdminStr && allAdminsStr) {
  //     const loggedInAdmin = JSON.parse(loggedInAdminStr); // contains email & password
  //     const allAdmins: admin[] = JSON.parse(allAdminsStr);

  //     const match = allAdmins.find(
  //       (adm) =>
  //         adm.email === loggedInAdmin.email &&
  //         adm.password === loggedInAdmin.password
  //     );

  //     if (match) {
  //       this.name = match.name;
  //     }
  //   }
  // }
  ngOnInit(): void {
    const userStore = this.adminservice.getUserStore();
    const loggedInAdmin = userStore.admin.loggedin;
    const allAdmins = userStore.admin.all;
    const loggedinuser = userStore.consumer.loggedin;
    const allConsumers = userStore.consumer.all;

    if (loggedInAdmin && allAdmins.length) {
      const match = allAdmins.find(
        (adm) =>
          adm.email === loggedInAdmin.email &&
          adm.password === loggedInAdmin.password
      );
      if (match) {
        this.name = match.name ?? '';
      }
    }
    if (loggedinuser && allConsumers.length) {
      const match = allConsumers.find(
        (cons) =>
          cons.email === loggedinuser.email &&
          cons.password === loggedinuser.password
      );
      if (match) {
        this.name = match.name ?? '';
      }
    }
  }
}
