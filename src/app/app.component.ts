import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eCome-PNG';

  constructor(private eltRef:ElementRef) {
    let prop = this.eltRef.nativeElement.getAttribute('userId');
    console.log('user Id passed ',prop);
    localStorage.setItem('passed',prop);
  }
}
