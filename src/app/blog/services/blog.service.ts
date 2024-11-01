import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IBlogCategory } from "../models/blog-category.model";
import { IBlogPost } from "../models/blog-post.model";
import { BackendService } from "./backend.service";

@Injectable({ 'providedIn': 'root' })
export class BlogService {
 title: string = 'Blog';
 categories: BehaviorSubject<IBlogCategory[]> = new BehaviorSubject<IBlogCategory[]>([]);
 posts: BehaviorSubject<IBlogPost[]> = new BehaviorSubject<IBlogPost[]>([]);
 
 constructor(private backendService: BackendService) {
  this.fetchBlogData();
 }

 async fetchBlogData(): Promise<void> {
  try {
   const { data, error } = await this.backendService.getData();
   
   if (error) throw error;
   
   this.categories.next(data.categoryData);
   this.posts.next(data.blogData);
  } catch (error) {
   throw `Error fetching blog data: ${String(error)}`;
  }
 }

 async updateBlogData(blogData: IBlogPost[]): Promise<void> {
  try {
   const { data, error } = await this.backendService.getBlog();
   
   if (error) throw error;
   
   this.posts.next(blogData);
  } catch (error) {
   throw `Error updating blog data: ${String(error)}`;
  }
 }

 getPost(link: string): IBlogPost | undefined {
  let postcopy = this.posts.getValue();
  return postcopy.find(X => X.link == link);
 }
}