import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { AdminControlPanelComponent } from "./admin-control-panel/admin-control-panel.component";
import { FormsModule } from "@angular/forms";
import { AdminOverviewComponent } from "./admin-overview/admin-overview.component";
import { BlogAdminComponent } from "./blog-admin/blog-admin.component";
import { MediaAdminComponent } from "./media-admin/media-admin.component";
import { PassAdminComponent } from "./pass-admin/pass-admin.component";

const routes: Routes = [
 { path: '', component: LoginComponent, pathMatch: 'full' },
 { path: 'cp', component: AdminControlPanelComponent, children: [
  { path: '', component: AdminOverviewComponent, pathMatch: 'full' },
  { path: 'media', component: MediaAdminComponent },
  { path: 'blog', component: BlogAdminComponent },
  { path: 'pass', component: PassAdminComponent }
 ] }
];

@NgModule({
 imports: [
  RouterModule.forChild(routes),
  CommonModule,
  FormsModule
 ],
 exports: [RouterModule],
 declarations: [
  LoginComponent,
  AdminControlPanelComponent,
  PassAdminComponent,
  AdminOverviewComponent,
  MediaAdminComponent,
  BlogAdminComponent
 ]
})
export class AdminModule {}