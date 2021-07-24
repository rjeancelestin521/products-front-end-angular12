import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product.model";
import {Observable, of} from "rxjs";
import {catchError, map, startWith} from "rxjs/operators";
import {AppDataState, DataStateEnum} from "../../state/product.state";
import {Router} from "@angular/router";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$: Observable<AppDataState<Product[]>> | null = null;
  readonly DataStateEnum = DataStateEnum;

  constructor(
    private productService: ProductService,
    private router: Router,
    private notifyService: NotificationService
  ) { }

  ngOnInit(): void {
    this.onGetAllProducts();
  }

  onGetAllProducts() {
   this.products$ = this.productService.getAllProducts()
     .pipe(
       map((data) => ({dataState: DataStateEnum.LOADED ,data:data})),
       startWith({dataState: DataStateEnum.LOADING}),
       catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message}))
     );
  }

  onGetAvailableProducts() {
    this.products$ = this.productService.getAvailableProducts()
      .pipe(
        map((data) => ({ dataState: DataStateEnum.LOADED, data: data })),
        startWith({ dataState: DataStateEnum.LOADING }),
        catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))
      );
  }

  onGetSelectedProducts() {
    this.products$ = this.productService.getSelectedProducts()
      .pipe(
        map((data) => ({ dataState: DataStateEnum.LOADED, data: data })),
        startWith({ dataState: DataStateEnum.LOADING }),
        catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))
      );
  }

  onSearchByName(dataForm: any) {
    this.products$ = this.productService.getProductsByNameContains(dataForm.keyword)
      .pipe(
        map((data) => ({ dataState: DataStateEnum.LOADED, data: data })),
        startWith({ dataState: DataStateEnum.LOADING }),
        catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))
      );
  }

  onSelectProduct(product: Product) {
    let id: number = product.id;
    this.productService.selectProduct(product)
      .subscribe(data => {
        product.selected = data.selected;
        let message:string = product.selected ?
          'The product n° ' + id + ' is selected':
          'The product n° ' + id + ' is unselected';
        this.notifyService.showInfo(message, 1000);
      });
  }

  onDeleteProduct(product: Product) {
    let response = confirm('Etes vous sûre?');
    if( response ){
      let id: number = product.id;
      this.productService.deleteProduct(product)
        .subscribe(data => {
          this.onGetAllProducts();
          let message = 'The product n° ' + id + ' is deleted !';
          this.notifyService.showDelete(message, 3000)
        });
    }
  }

  onNewProduct() {
    this.router.navigateByUrl('/newProduct');
  }

  onEditProduct(product: Product) {
    this.router.navigateByUrl('/editProduct/' + product.id);
  }
}
