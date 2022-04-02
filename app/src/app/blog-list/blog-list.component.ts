import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditBlogModalComponent } from '../modals/edit-blog-modal/edit-blog-modal.component';
import { Blog } from '../models/blog';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  blogs: Blog[] = [];
  title = 'angular-bootstrap-modal';

  constructor(public http: HttpClient, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.http.get('http://0.0.0.0:8000/blogs')
      .subscribe(
        (data: any) => this.load_blogs(data),
        err => console.log(err)
      );

    this.http.get('http://0.0.0.0:8000/blogs/5')
      .subscribe(
        (data: any) => console.log(data),
        err => console.log(err)
      );
  }

  load_blogs(items: Blog[]): void {
    this.blogs = items
  }

  openModal() {
    const modalRef = this.modalService.open(EditBlogModalComponent,
      {
        size: 'lg',
        // keyboard: false,
        backdrop: 'static'
      });

    let data = {
      name: 'Some Data',
      content: 'From Parent Component',
      status: 'initial'
    }

    modalRef.componentInstance.fromParent = data;
    modalRef.result.then((result) => {
      console.log(result);
    }, (reason) => {
    });
  }

}
