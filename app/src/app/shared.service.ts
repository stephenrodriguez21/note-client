import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { BlogCategoryModel } from './models/blog';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private subject = new Subject<any>();

  sendClickEvent() {
    this.subject.next(true);
  }
  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }
}
