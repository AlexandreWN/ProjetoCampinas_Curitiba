import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  authToken : string | null;
  authOwner : string | null;

  constructor(private router: Router) {
    this.authToken = localStorage.getItem("authToken");
    this.authOwner = localStorage.getItem("authOwner");

   }

  ngOnInit(): void {
  }

  sair(){
    localStorage.removeItem('authOwner');
    localStorage.removeItem('authToken');
  }

}
