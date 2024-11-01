import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { IBlogPost } from '../models/blog-post.model';
import { ActivatedRoute } from '@angular/router';
import { IBlogCategory } from '../models/blog-category.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blog-category',
  templateUrl: './blog-category.component.html',
  styleUrls: ['./blog-category.component.scss']
})
export class BlogCategoryComponent implements OnInit, OnDestroy {
 posts: IBlogPost[] = [];
 category?: IBlogCategory;
 catSub?: Subscription;
 postSub?: Subscription;

 constructor(private blogService: BlogService,
  private route: ActivatedRoute) {}

 ngOnInit(): void {
  const cat = this.route.snapshot.params['cat'];
  this.catSub = this.blogService.categories.subscribe(X => this.category = X.find(Y => Y.link == cat));
  this.postSub = this.blogService.posts.subscribe(X => this.posts = X.filter(Y => Y.categories.some(Z => Z == cat)));
 }
 ngOnDestroy(): void {
  if (this.catSub) this.catSub.unsubscribe();
  if (this.postSub) this.postSub.unsubscribe();
 }
}