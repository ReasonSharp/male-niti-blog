import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BlogComponent } from "./blog.component";
import { BlogSearchboxComponent } from './blog-searchbox/blog-searchbox.component';
import { BlogCategoriesListComponent } from './blog-categories-list/blog-categories-list.component';
import { BlogCategoryComponent } from "./blog-category/blog-category.component";
import { BlogPostComponent } from "./blog-post/blog-post.component";
import { BlogPostShortComponent } from './blog-post-short/blog-post-short.component';
import { BlogPaginatorComponent } from './blog-paginator/blog-paginator.component';
import { CommonModule } from "@angular/common";

const routes: Routes = [
 { path: '', component: BlogComponent, pathMatch: 'full' },
 { path: 'post/:post', component: BlogPostComponent },
 { path: 'cat/:cat', component: BlogCategoryComponent }
];

@NgModule({
 imports: [RouterModule.forChild(routes), CommonModule],
 exports: [RouterModule],
 declarations: [
   BlogSearchboxComponent,
   BlogCategoriesListComponent,
   BlogComponent,
   BlogCategoryComponent,
   BlogPostComponent,
   BlogPostShortComponent,
   BlogPaginatorComponent
 ]
})
export class BlogModule {}