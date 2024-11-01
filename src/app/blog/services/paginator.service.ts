import { Injectable } from "@angular/core";
import { BlogService } from "./blog.service";

@Injectable({ 'providedIn': 'root' })
export class PaginatorService {
 pageStart: number = 0;
 pageSize: number = 10;
 postCount: number = 0;
 cpage: number = 1;
 pageCnt: number = 1;

 constructor(private blogService: BlogService) {
  this.blogService.posts.subscribe(X => {
   this.postCount = X.length;
   this.pageCnt = Math.ceil(this.postCount / this.pageSize);
  });
 }
}