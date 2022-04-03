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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogService } from './blog.service';
import { SharedService } from './shared.service';
import { ToastsContainerComponent } from './notification/toasts-container/toasts-container.component';
import { ToastService } from './notification/services/toast.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BlogListComponent,
    EditBlogModalComponent,
    ToastsContainerComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    BlogService,
    SharedService,
    ToastService,
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
