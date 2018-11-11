import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBs_AvP5vIQIcYaGfwRwRwyuJYxMCRxXiE',
      authDomain: 'ng-recipe-4afda.firebaseapp.com'
    });
  }
}
