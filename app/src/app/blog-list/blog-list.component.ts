import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { EditBlogModalComponent } from '../modals/edit-blog-modal/edit-blog-modal.component';
import { Blog, BlogEditModel } from '../models/blog';
import { LoggedInUser } from '../models/login';
import { ToastService } from '../notification/services/toast.service';
import { AuthService } from '../services/auth.service';
import { BlogService } from '../services/blog.service';
import { SharedService } from '../services/shared.service';

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
  loggedInUser!: LoggedInUser | null;

  constructor(private authService: AuthService,
    private blogService: BlogService,
    private modalService: NgbModal,
    private toastService: ToastService,
    private sharedService: SharedService) {

    this.clickEventsubscription$ = this.sharedService.getClickEvent().subscribe(() => {
      this.showEditBlogModal(new Blog())
    });
  }

  ngOnInit(): void {
    this.loggedInUser = this.authService.getLoggedInUser()
    this.checkIfAuthenticated();
    this.getBlogs()
  }

  checkIfAuthenticated(): void {
    this.isAuthenticated = this.authService.isAuthenticated()
  }

  getBlogs(): void {
    this.blogs = this.blogService.getAll();
  }

  showModal(): void {
    const modalRef = this.modalService.open(EditBlogModalComponent,
      {
        size: 'lg',
        backdrop: 'static'
      });

    this.editBlog.author = this.loggedInUser?.name
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

  updateBlog(editModel: BlogEditModel): void {
    this.blogService.updateBlog(editModel).subscribe(() => this.getBlogs())
  }

  createBlog(editModel: BlogEditModel): void {
    this.blogService.createBlog(editModel).subscribe(() => this.getBlogs())
  }

  showEditBlogModal(blog: Blog): void {
    if (blog.id > 0) {
      this.blogService.editBlog(blog.id).subscribe((blog: Blog) => {
        this.editBlog = blog;
        this.showModal();
      }, (err) => {
        if (err.status === 401) this.toastService.show('You are only allowed to edit your blog', { classname: 'bg-danger text-light', delay: 2500 });
      });
    } else {
      this.editBlog = blog;
      this.showModal();
    }
  }

  deleteBlog(blog: Blog) {
    this.blogService.deleteBlog(blog.id).subscribe(
      () => { this.getBlogs() },
      (err: any) => {
        if (err.status === 401) this.toastService.show('You are only allowed to delete your blog', { classname: 'bg-danger text-light', delay: 2500 })
      }
    );
  }

}
