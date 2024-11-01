import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Component({
 selector: 'app-login',
 templateUrl: './login.component.html',
 styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 email: string = 'petrana.sabolek@maleniti.com';
 password: string = '';
 loading: boolean = false;
 error: string = '';
 
 constructor(private route: ActivatedRoute,
  private router: Router,
  private adminService: AdminService) {}

 ngOnInit(): void {
 }
 
 async login() {
  this.loading = true;
  this.error = '';
  try {
   const response: any = undefined;
   if (response && response.error) {
    this.error = `Login failed. ${response.error.message}`;
   } else {
    this.adminService.setUser(response.data);
    this.router.navigate([ 'cp' ], { 'relativeTo': this.route });
   }
  } catch (err) {
   console.error('Login error:', err);
   this.error = 'Login failed. Please check your credentials.';
  } finally {
   this.loading = false;
  }
 }
}