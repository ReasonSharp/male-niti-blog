import { Injectable } from "@angular/core";
import { BlogService } from "./blog.service";

@Injectable({ 'providedIn': 'root' })
export class BackendService {
 getBlog(): { data: any; error: any; } | PromiseLike<{ data: any; error: any; }> {
  return { data: null, error: null};
 }
 getData(): { data: any; error: any; } | PromiseLike<{ data: any; error: any; }> {
  return { data: {
   categoryData: [{
    title: "All posts",
    imgurl: "https://image.api.playstation.com/cdn/EP2259/CUSA05956_00/XTzneAFXsTJLyfjGpCmzOoCMjz6441IZ.jpg",
    link: "all"
   }],
   blogData: [{
    title: "My first post",
    author: "Nikola Novak",
    date: 20241010,
    categories: ["all"],
    imgurl: "",
    body: "Hi, this is my first post! Welcome to Naked Diaries.",
    link: "post1"
   }]
  }, error: null};
 }
}