import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from '../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-overview',
  templateUrl: './admin-overview.component.html',
  styleUrls: ['./admin-overview.component.scss']
})
export class AdminOverviewComponent {
 user?: any;
 userSub?: Subscription;

 constructor(private adminService: AdminService,
  private route: ActivatedRoute,
  private router: Router) {}

 ngOnInit(): void {
  this.userSub = this.adminService.user.subscribe({ next: data => {
   if (!data) this.router.navigate([ '..' ], { 'relativeTo': this.route });
   else this.user = data;
  }, error: () => {
   this.router.navigate([ '..' ], { 'relativeTo': this.route });
  }});
 }
 ngOnDestroy(): void {
  if (this.userSub) this.userSub.unsubscribe();
 }

 getName(): string {
  if (this.user) {
   if (this.user.user.user_metadata['ime']) return this.user.user.user_metadata['ime'];
   else if (this.user.user.email) return this.user.user.email;
  }
  return '';
 }
}