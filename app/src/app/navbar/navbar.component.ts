import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.goLogin({email:"james@test.com", password: "james123"})
    .subscribe(
      (data: any) => this.authService.setAuthToken(data.token),
      err => console.log(err)
    );
  }


}
