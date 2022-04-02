import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BlogCategoryModel, BlogEditModel } from 'src/app/models/blog';

@Component({
  selector: 'app-edit-blog-modal',
  templateUrl: './edit-blog-modal.component.html',
  styleUrls: ['./edit-blog-modal.component.css']
})
export class EditBlogModalComponent implements OnInit {

  @Input()
  fromParent!: BlogEditModel;
  title: string = 'Create Blog';

  blogStatus = ["created", "pending_verification", "verified", "rejected"]
  blogCategories: BlogCategoryModel[] = [
    { id: 1, name: "Fashion" },
    { id: 2, name: "Food" },
    { id: 3, name: "Technology" },
    { id: 4, name: "Science" },
    { id: 5, name: "Politics" }
  ]

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    if (this.fromParent.id > 0) {
      this.title = 'Edit Blog';
    }
  }

  closeModal(action: string): void {
    this.activeModal.close(null);
  }

  saveChanges(): void {
    this.activeModal.close(this.fromParent)
  }
}
