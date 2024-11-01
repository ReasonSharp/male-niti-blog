import { Component, Input } from '@angular/core';
import { IBlogPost } from '../models/blog-post.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blog-post-short',
  templateUrl: './blog-post-short.component.html',
  styleUrls: ['./blog-post-short.component.scss']
})
export class BlogPostShortComponent {
 @Input() post?: IBlogPost;

 constructor(private route: ActivatedRoute, private router: Router) { }

 openCategory(category: string, event: Event) {
  event.preventDefault();
  this.router.navigate([ 'cat', category.toLocaleLowerCase() ], { relativeTo: this.route });
 }
 openPost(event: Event) {
  event.preventDefault();
  if (this.post) this.router.navigate([ 'post', this.post?.link ]);
 }

 formatBody() : string | undefined {
  let result = this.post?.body?.substring(0, 250);
  if (result) {
   let idxlt = result.lastIndexOf('<');
   let idxgt = result.lastIndexOf('>');
   if (idxlt > idxgt) result = result.substring(0, idxlt);
   result = result.replaceAll('<p>', '');
   result = result.replaceAll('</p>', ' ');
  }
  return result + '...';
 }
}