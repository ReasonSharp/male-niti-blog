import { Component, OnDestroy, OnInit } from '@angular/core';
import { DisplayedComponentService } from '../services/displayed-component.service';
import { BlogService } from 'src/app/blog/services/blog.service';
import { IBlogPost } from 'src/app/blog/models/blog-post.model';
import { IBlogCategory } from 'src/app/blog/models/blog-category.model';
import { Subscription } from 'rxjs';
import { IDocument } from '../models/document.model';
import { MediaService } from '../services/media.service';
import { DatePipe } from '@angular/common';

@Component({
 selector: 'app-blog-admin',
 templateUrl: './blog-admin.component.html',
 styleUrls: ['./blog-admin.component.scss'],
 providers: [DatePipe]
})
export class BlogAdminComponent implements OnInit, OnDestroy {
 success?: string;
 error?: string;
 saving: boolean = false;
 editing: boolean = false;
 posts: IBlogPost[] = [];
 categories: IBlogCategory[] = [];
 images: IDocument[] = [];
 postSub?: Subscription;
 catSub?: Subscription;
 imgSub?: Subscription;
 post: IBlogPost = { author: '', body: '', categories: [], date: 0, imgurl: '', link: '', title: '' };
 selectedImgIndex?: number;
 selCat: boolean[] = [];
 selPostIdx?: number;
 
 constructor(private displayedComponentService: DisplayedComponentService,
  private blogService: BlogService,
  private mediaService: MediaService,
  private datePipe: DatePipe) {}
  ngOnInit(): void {
   this.postSub = this.blogService.posts.subscribe({ next: X => this.posts = X });
   this.catSub = this.blogService.categories.subscribe({ next: X => {
    this.categories = X;
    this.selCat = Array(this.categories.length).fill(false);
   }});
   this.imgSub = this.mediaService.documents.subscribe({ next: X => {
    this.images.splice(0);
    X.filter(Y => Y.type == 'image').forEach(Y => this.images.push(Y));
   }});
   setTimeout(() => this.displayedComponentService.displayedComponent = 3, 0);
  }
  ngOnDestroy(): void {
   if (this.postSub) this.postSub.unsubscribe();
   if (this.catSub) this.catSub.unsubscribe();
   if (this.imgSub) this.imgSub.unsubscribe();
  }
  
  async createPost() {
   if (this.editing) {
    if (this.selPostIdx != undefined) this.posts.splice(this.selPostIdx, 1, this.post);
    else return;
   } else {
    if (this.post.title && this.post.title.trim() != '') {
     this.post.link = this.post.title.toLowerCase().replaceAll(' ', '-').replace(/[^a-zA-Z0-9\-]/g, '');
     const usr: any = undefined;
     this.post.author = usr?.data.user?.email?.substring(0, usr?.data.user?.email?.indexOf('@')) ?? '';
     this.post.categories.splice(0);
     for (let x = 0; x < this.categories.length; ++x)
     if (this.selCat[x] == true)
     this.post.categories.push(this.categories[x].link);
     this.post.date = new Date().getTime();
     this.posts.splice(0, 0, this.post);
    }
   }
   
   this.saving = true;
   try {
    await this.blogService.updateBlogData(this.posts);
    this.saving = false;
    if (this.post.title && this.post.title.trim() != '') this.success = 'Zapis je uspješno kreiran i objavljen.';
    else this.success = 'Promjene su uspješno spremljene.';
    setTimeout(() => this.success = undefined, 10000);
   } catch (error) {
    this.error = String(error);
    setTimeout(() => this.error = undefined, 10000);
   } finally {
    this.saving = false;
   }
  }
  updateImg() {
   if (this.selectedImgIndex) this.post.imgurl = this.images[this.selectedImgIndex].link;
  }
  loadPost() {
   if (this.selPostIdx) {
    this.editing = true;
    const sp = this.posts[this.selPostIdx];
    this.post.author = sp.author;
    this.post.body = sp.body;
    this.post.categories = sp.categories;
    this.post.date = sp.date;
    this.post.imgurl = sp.imgurl;
    this.post.link = sp.link;
    this.post.title = sp.title;
    for (let x = 0; x < this.categories.length; ++x)
    if (this.post.categories.includes(this.categories[x].link)) this.selCat[x] = true;
    else this.selCat[x] = false;
   }
  }
  cancelChanges() {
   this.selPostIdx = undefined;
   this.editing = false;
   this.post = { author: '', body: '', categories: [], date: 0, imgurl: '', link: '', title: '' };
   this.selCat = Array(this.categories.length).fill(false);
  }
  deletePost() {
   if (this.editing && this.selPostIdx) {
    this.editing = false;
    this.posts.splice(this.selPostIdx, 1);
    this.cancelChanges();
   }
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
 