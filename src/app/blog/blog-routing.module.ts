import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from "./blog.component";
import { BlogPostComponent } from "./blog-post/blog-post.component";
import { BlogCategoryComponent } from './blog-category/blog-category.component';

const routes: Routes = [
 { path: '', component: BlogComponent, pathMatch: 'full' },
 { path: 'post/:post', component: BlogPostComponent },
 { path: 'cat/:cat', component: BlogCategoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
