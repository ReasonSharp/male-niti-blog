import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProjectService } from './shared/services/project.service';

@Component({
 selector: 'app-root',
 templateUrl: './app.component.html',
 styleUrls: ['./app.component.scss']
})
export class AppComponent {
 constructor(private projectService: ProjectService) {
  this.projectService.name = environment.projectName;
 }
}