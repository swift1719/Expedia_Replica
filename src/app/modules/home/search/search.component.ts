import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  id:string='hotels';
  previousActiveElement:any;

  switchTab(value:string){
    document.getElementById(this.id)?.classList.remove('active');
    document.getElementById(value)?.classList.add('active');
    this.id=value;
    
  }

}
