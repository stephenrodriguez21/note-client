import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { BlogService } from '../blog.service';
import { Authentication, LoggedInUser, Login } from '../models/login';
import { SharedService } from '../shared.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  login: Login = new Login();
  isAuthenticated: boolean = false;
  username: string | undefined = "";

  constructor(private authService: AuthService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.checkIfAuthenticated();
  }

  checkIfAuthenticated(): void {
    const loggedinUser = this.authService.getLoggedInUser()
    this.username = loggedinUser?.email;
    this.isAuthenticated = this.authService.isAuthenticated()

  }

  createBlog() {
    this.sharedService.sendClickEvent();
  }

  onLogin(): void {
    this.authService.goLogin(this.login)
      .subscribe(
        (data: Authentication) => {
          this.authService.setAuthToken(data.token);
          this.authService.setLoggedInUser(data.loggedin_user);
          setTimeout(() => window.location.reload(), 300);
        },
        err => console.log(err)
      );
  }

  async logout() {
    await this.authService.logout().subscribe(() => window.location.reload())
  }
}
