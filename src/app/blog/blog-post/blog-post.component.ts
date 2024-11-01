import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IBlogPost } from '../models/blog-post.model';
import { BlogService } from '../services/blog.service';
import { DatePipe } from '@angular/common';

@Component({
 selector: 'app-blog-post',
 templateUrl: './blog-post.component.html',
 styleUrls: ['./blog-post.component.scss'],
 providers: [ DatePipe ]
})
export class BlogPostComponent implements OnInit {
 post?: IBlogPost;
 likedids: string[] = [];
 replyto?: string;
 
 constructor(private route: ActivatedRoute,
  private blogService: BlogService,
  private datePipe: DatePipe,
  private router: Router) {}
  
  ngOnInit(): void {
   this.post = this.blogService.getPost(this.route.snapshot.params['post']);
  }
  
  openCategory(cat: string, event: Event) {
   event.preventDefault();
   this.router.navigate([ 'blog', 'cat', cat ]);
  }

  getDate(epoch: number | undefined) : string {
   if (epoch == undefined) return 'datum objave nije poznat';
   try {
    return this.datePipe.transform(new Date(epoch), 'MMMM dd, yyyy.', undefined, 'hr-HR') ?? 'datum objave nije poznat';
   } catch (error) {
    return this.datePipe.transform(new Date(epoch), 'MMMM dd, yyyy.') ?? 'datum objave nije poznat';
   }
  }
 }
 