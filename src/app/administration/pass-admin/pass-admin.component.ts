import { Component } from '@angular/core';
import { DisplayedComponentService } from '../services/displayed-component.service'

@Component({
 selector: 'app-pass-admin',
 templateUrl: './pass-admin.component.html',
 styleUrls: ['./pass-admin.component.scss']
})
export class PassAdminComponent {
 success?: string;
 error?: string;
 saving: boolean = false;
 pass1: string = '';
 pass2: string = '';
 constructor(private displayedComponentService: DisplayedComponentService) {}
  ngOnInit(): void {
   setTimeout(() => this.displayedComponentService.displayedComponent = 4, 0);
  }
  
  async onSubmit() {
   this.saving = true;
   if (this.pass1.length < 5) {
    this.error = 'Lozinka mora imati barem pet znakova.';
    this.saving = false;
    return;
   }
   if (this.pass1 != this.pass2) {
    this.error = 'Lozinke se moraju podudarati.';
    this.saving = false;
    return;
   }
   try {
    // todo
    this.saving = false;
    this.success = 'Lozinka je uspješno promijenjena.';
    setTimeout(() => this.success = undefined, 10000);
   } catch (error) {
    this.error = String(error);
    setTimeout(() => this.error = undefined, 10000);
   } finally {
    this.saving = false;
   }
  }
 }
 