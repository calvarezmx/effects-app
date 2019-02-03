import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  constructor( private router: Router ) { }

  ngOnInit() {
  }

  goUser( userId: string ) {
    if ( !userId ) {
      return;
    }

    this.router.navigate(['/user', userId]);
    console.log('userId: ', userId);
  }

}
