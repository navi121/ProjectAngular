import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  images = [700, 800, 807].map((n) => `https://picsum.photos/id/${n}/900/500`);
  
  constructor() { }

  ngOnInit(): void {  
  }

}
