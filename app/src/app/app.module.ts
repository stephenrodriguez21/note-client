import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { AuthService } from './auth.service';
import { AuthInterceptorService } from './interceptor.service';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditBlogModalComponent } from './modals/edit-blog-modal/edit-blog-modal.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BlogListComponent,
    EditBlogModalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [
    AuthService , 
    {
     provide: HTTP_INTERCEPTORS,
     useClass: AuthInterceptorService,
     multi: true
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [EditBlogModalComponent]
})
export class AppModule { }
