import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { BlogService } from '../blog.service';
import { EditBlogModalComponent } from '../modals/edit-blog-modal/edit-blog-modal.component';
import { Blog, BlogEditModel } from '../models/blog';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  blogs!: Observable<Blog[]>;
  editBlog!: Blog;
  clickEventsubscription$!: Subscription;
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService,
    private blogService: BlogService,
    private modalService: NgbModal,
    private sharedService: SharedService) {

    this.clickEventsubscription$ = this.sharedService.getClickEvent().subscribe(() => {
      this.openModal(new Blog())
    });
  }

  ngOnInit(): void {
    this.checkIfAuthenticated();
    this.getBlogs()
  }

  checkIfAuthenticated(): void {
    this.isAuthenticated = this.authService.isAuthenticated()
  }

  getBlogs(): void {
    this.blogs = this.blogService.getAll();
  }

  renderModal(): void {
    const modalRef = this.modalService.open(EditBlogModalComponent,
      {
        size: 'lg',
        backdrop: 'static'
      });

    modalRef.componentInstance.fromParent = this.editBlog;
    modalRef.result.then((editModel: BlogEditModel) => {
      if (editModel == null) return;

      if (editModel.id > 0) {
        this.updateBlog(editModel)
      } else {
        this.createBlog(editModel)
      }
    });
  }

  updateBlog(editModel: BlogEditModel) {
    this.blogService.updateBlog(editModel).subscribe(() => this.getBlogs())
  }

  createBlog(editModel: BlogEditModel) {
    this.blogService.createBlog(editModel).subscribe(() => this.getBlogs())
  }

  openModal(blog: Blog) {
    if (blog.id > 0) {
      this.blogService.editBlog(blog.id).subscribe((blog: Blog) => {
        this.editBlog = blog;
        this.renderModal();
      })
    } else {
      this.editBlog = blog;
      this.renderModal();
    }
  }

}
