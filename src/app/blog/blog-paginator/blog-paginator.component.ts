import { Component, OnInit } from '@angular/core';
import { PaginatorService } from '../services/paginator.service';

@Component({
  selector: 'app-blog-paginator',
  templateUrl: './blog-paginator.component.html',
  styleUrls: ['./blog-paginator.component.scss']
})
export class BlogPaginatorComponent implements OnInit {
 indicesArray: number[] = [ 0 ];

 constructor(private paginatorService: PaginatorService) { }

 ngOnInit(): void {
  this.indicesArray = Array.from({ length: this.paginatorService.pageCnt }).map((_, index) => index);
 }
}