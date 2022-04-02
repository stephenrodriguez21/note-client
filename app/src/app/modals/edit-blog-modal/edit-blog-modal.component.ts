import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-blog-modal',
  templateUrl: './edit-blog-modal.component.html',
  styleUrls: ['./edit-blog-modal.component.css']
})
export class EditBlogModalComponent implements OnInit {

  @Input() fromParent: any;

  blogStatus = ["initial", "pending_verification", "verified", "rejected"]

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    console.log(this.fromParent);
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }

}
