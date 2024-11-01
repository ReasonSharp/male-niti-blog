import { Component, OnInit } from '@angular/core';
import { BlogService } from './services/blog.service';
import { Subscription } from 'rxjs';
import { IBlogPost } from './models/blog-post.model';
import { PaginatorService } from './services/paginator.service';
import { ProjectService } from '../shared/services/project.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
 blog?: any = { title: 'Naked Diaries' };
 posts: IBlogPost[] = [];
 postsub?: Subscription;

 constructor(private blogService: BlogService,
  public paginatorService: PaginatorService,
  private projectService: ProjectService) {
   this.blog = { title: projectService.name };
  }

 ngOnInit(): void {
  this.postsub = this.blogService.posts.subscribe(X => this.posts = X);
 }
}
