import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-regulators',
  templateUrl: './list-regulators.component.html',
  styleUrls: ['./list-regulators.component.scss']
})
export class ListRegulatorsComponent implements OnInit {
  searchValue: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  onClearInput() {
    this.searchValue = ''
  }
}
