import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BlogCategoryModel, BlogEditModel, BlogStatusModel } from 'src/app/models/blog';

@Component({
  selector: 'app-edit-blog-modal',
  templateUrl: './edit-blog-modal.component.html',
  styleUrls: ['./edit-blog-modal.component.css']
})
export class EditBlogModalComponent implements OnInit {

  @Input()
  fromParent!: BlogEditModel;
  title: string = 'Create Blog';

  blogStatus: BlogStatusModel[] = [
    { name: 'Created', value: "created" },
    { name: 'Pending', value: "pending_verification" },
    { name: 'Verified', value: "verified" },
    { name: 'Rejected', value: "rejected" }
  ]
  blogCategories: BlogCategoryModel[] = [
    { id: 1, name: "Fashion" },
    { id: 2, name: "Food" },
    { id: 3, name: "Technology" },
    { id: 4, name: "Science" },
    { id: 5, name: "Politics" }
  ];

  editBlogForm = this.fb.group({
    id: 0,
    name: ['', Validators.required],
    content: ['', Validators.required],
    status: ['', Validators.required],
    category_id: ['', Validators.required],
    author: [{value: '', disabled: true}]
  });

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.editBlogForm.patchValue(this.fromParent);

    if (this.fromParent.id > 0) {
      this.title = 'Edit Blog';
    }
  }

  closeModal(action: string): void {
    this.activeModal.close(null);
  }

  saveChanges(): void {
    if (this.editBlogForm.valid) {
      this.activeModal.close(this.editBlogForm.value);
    }
  }
}
