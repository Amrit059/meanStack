import { Component, OnInit } from '@angular/core';
// import { TextService } from '../services/text.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  news = {};
  constructor() { }

  ngOnInit() {
    // this.auth.getallnews()
    //   .subscribe(data => {
    //     this.news = data;
      // });private auth: TextService
  }

}
