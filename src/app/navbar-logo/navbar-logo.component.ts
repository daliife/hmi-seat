import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-logo',
  templateUrl: './navbar-logo.component.html',
  styleUrls: ['./navbar-logo.component.scss']
})
export class NavbarLogoComponent implements OnInit {

  showLogos = true;

  constructor() {}

  ngOnInit(): void {}

  toggleLogos(): void{
    this.showLogos = !this.showLogos;
  }

}
