import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfileComponent } from 'src/app/private/user-profile/user-profile.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public router:Router,public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UserProfileComponent, {
      width: '250px',
   
    });

    dialogRef.afterClosed().subscribe(result => {
     
    });
  }

}
