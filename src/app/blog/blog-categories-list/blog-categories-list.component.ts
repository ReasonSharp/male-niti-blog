import { Component, OnDestroy, OnInit } from '@angular/core';
import { IBlogCategory } from '../models/blog-category.model';
import { BlogService } from '../services/blog.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
 selector: 'app-blog-categories-list',
 templateUrl: './blog-categories-list.component.html',
 styleUrls: ['./blog-categories-list.component.scss']
})
export class BlogCategoriesListComponent implements OnInit, OnDestroy {
 categories: IBlogCategory[] = [];
 catsub?: Subscription;

 constructor(private route: ActivatedRoute, private router: Router, private blogService: BlogService) {}

 ngOnInit(): void {
  this.catsub = this.blogService.categories.subscribe(X => {
   this.categories.slice();
   X.forEach(Y => this.categories.push(Y));
  });
 }
 ngOnDestroy(): void {
  if (this.catsub) this.catsub.unsubscribe();
 }

 openCategory(category: string, event: Event) {
  event.preventDefault();
  this.router.navigate([ 'cat', category.toLocaleLowerCase() ], { relativeTo: this.route });
 }
}