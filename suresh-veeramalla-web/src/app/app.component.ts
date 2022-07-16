import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  avatar_url:string,
  login: string,
  type: string
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  
  title = 'suresh-veeramalla-web';
  searchValue:string
  displayedColumns: string[] = [ 'avatar_url', 'login', 'type'];
  dataSource = new MatTableDataSource<PeriodicElement>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private http:HttpClient
    ){  }
 
    getUserData(): void{
      const url= `https://api.github.com/search/users?q=${this.searchValue} in:login`
      this.http.get(url).subscribe((res:any)=>{
        this.dataSource =  new MatTableDataSource<PeriodicElement>(res.items);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    }
    clearData(){
      this.searchValue='';
        this.dataSource =  new MatTableDataSource<PeriodicElement>([]);
    }
}
