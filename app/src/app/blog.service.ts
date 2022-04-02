import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog, BlogEditModel } from './models/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  baseUrl: string = "http://0.0.0.0:8000";

  constructor(public http: HttpClient) { }

  getAll(): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${this.baseUrl}/blogs`)
  }

  createBlog(model: BlogEditModel): Observable<any> {
    return this.http.post<Blog>(`${this.baseUrl}/blogs`, model)
  }

  editBlog(id: number): Observable<Blog> {
    return this.http.get<Blog>(`${this.baseUrl}/blogs/${id}`)
  }

  updateBlog(model: BlogEditModel): Observable<any> {
    return this.http.put<Blog>(`${this.baseUrl}/blogs/${model.id}`, model)
  }
}
