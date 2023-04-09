import { Component, OnInit } from '@angular/core';
import { DataInterface } from '../interfaces/data.interface';
import { OptionsInterface } from '../interfaces/options.interface';
import { FetchService } from '../services/fetch.service';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-table-grid',
  templateUrl: './table-grid.component.html',
  styleUrls: ['./table-grid.component.css']
})
export class TableGridComponent implements OnInit {
  data: DataInterface[] = [];
  columns : Array<keyof DataInterface> = ["barCode", "manufacturer", "modelNumber" ,"building" ,  "roomNo", "quantity"];
  options : OptionsInterface = {
    sort : 'barCode',
    order : 'DESC',
    searchValue: "",
    currentPage: 1,
    totalPages: 1,
    page : 1,
    limit: 15,
    prev: 1,
    next: 2
  }
  
  constructor(private fetchService: FetchService, private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(){
    this.fetchService.getData(this.options).subscribe(data => {
      this.data = data.items;
      this.options.currentPage = data.currentPage
      this.options.totalPages = data.totalPages
      this.options.next = data.next
      this.options.prev = data.prev
    })
  }

  isDescSorting(column: string): boolean {
  return this.options.sort === column && this.options.order === 'DESC';
  }

  isAscSorting(column: string): boolean {
    return this.options.sort === column && this.options.order === 'ASC';
  }

  sortColumn(column : string): void {
    const nextSortingOrder = this.isDescSorting(column) ? 'ASC' : 'DESC';
    this.options.sort = column;
    this.options.order = nextSortingOrder
    this.fetchData();
  }

  onSearch(text : any){
    this.options.searchValue = text.value;
    this.fetchData()
  }

  onNext(){
    this.options.page = this.options.next;
    console.log(this.options.next)
    this.fetchData();
  }

  onPrev(){
    this.options.page = this.options.prev;
    console.log(this.options.prev)
    this.fetchData();
  }

  onPage(page : number){
    this.options.page = page > 1 ? page : page + 1;
    this.fetchData();
  }

  onLimit(limit: any){
    this.options.limit = limit.value;
    this.fetchData();
  }

}
