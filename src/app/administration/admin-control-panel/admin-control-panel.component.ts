import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DisplayedComponentService } from '../services/displayed-component.service';

@Component({
  selector: 'app-admin-control-panel',
  templateUrl: './admin-control-panel.component.html',
  styleUrls: ['./admin-control-panel.component.scss']
})
export class AdminControlPanelComponent implements OnInit, OnDestroy {
 user?: any;
 userSub?: Subscription;

 constructor(private adminService: AdminService,
  private route: ActivatedRoute,
  private router: Router,
  public displayedComponentService: DisplayedComponentService) {}

 ngOnInit(): void {
  this.userSub = this.adminService.user.subscribe({ next: data => {
   if (!data) {
   } else this.user = data;
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

 openOpus(event: Event) {
  event.preventDefault();
  this.router.navigate([ 'opus' ], { 'relativeTo': this.route });
  this.displayedComponentService.displayedComponent = 1;
 }
 openMedia(event: Event) {
  event.preventDefault();
  this.router.navigate([ 'media' ], { 'relativeTo': this.route });
  this.displayedComponentService.displayedComponent = 5;
 }
 openBooks(event: Event) {
  event.preventDefault();
  this.router.navigate([ 'books' ], { 'relativeTo': this.route });
  this.displayedComponentService.displayedComponent = 2;
 }
 openBlog(event: Event) {
  event.preventDefault();
  this.router.navigate([ 'blog' ], { 'relativeTo': this.route });
  this.displayedComponentService.displayedComponent = 3;
 }
 openPass(event: Event) {
  event.preventDefault();
  this.router.navigate([ 'pass' ], { 'relativeTo': this.route });
  this.displayedComponentService.displayedComponent = 3;
 }
 back(event: Event) {
  event.preventDefault();
  this.router.navigate([ '.' ], { 'relativeTo': this.route });
  this.displayedComponentService.displayedComponent = 0;
 }
 logout(event: Event) {
  event.preventDefault();
  this.router.navigate([ '..' ], { 'relativeTo': this.route });
  this.displayedComponentService.displayedComponent = 0;
 }
}