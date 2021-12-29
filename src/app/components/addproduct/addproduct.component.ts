import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from './product.model';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  product = new Product()
  categoryItem: any
  isSave: boolean = true

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getCategories()
    console.log(this.categoryItem);

  }

  selectedNumber: String = '';


  onRowClick() {
    console.log(this.selectedNumber)

    if (history.state.isSave != undefined) {
      this.product = history.state.prod
      this.isSave = history.state.isSave

      console.log(history.state.prod);

    }
  }

  getCategories() {
    const headers = { 'content-type': 'application/json' };
    this.http.get<any>('http://localhost:9988/category/getAll', { headers })
      .subscribe(map => {
        console.log(map.Data);
        this.categoryItem = map.Data;
      })
  }


  addProduct() {
    const headers = { 'content-type': 'application/json' };
    this.http.post<any>("http://localhost:9988/product/save", JSON.stringify(this.product), { headers: headers })
      .subscribe(data => {
        alert("New Product Added Successfull")
        this.product = new Product();
        this.isSave = true
      }, err => {
        alert("product already exist")
      }
      )
  }

  updateProduct() {

    const headers = { 'content-type': 'application/json' };
    this.http.post<any>("http://localhost:9988/product/update", JSON.stringify(this.product), { headers: headers })
      .subscribe(data => {
        this.product = new Product()
        alert("Product Updated Successfully")
        this.isSave = true
      }
      )

  }


}
