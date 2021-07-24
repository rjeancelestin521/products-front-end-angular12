import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  productId: number;
  productFormGroup: FormGroup | null = null;
  submitted: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private fb: FormBuilder,
    private router: Router,
    private notifyService: NotificationService)
  {
    this.productId = activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.productService.getProductById(this.productId)
      .subscribe(product => {
        this.productFormGroup = this.fb.group({
          id: [product.id, Validators.required],
          name: [product.name, Validators.required],
          price: [product.price, Validators.required],
          quantity: [product.quantity, Validators.required],
          selected: [product.selected, Validators.required],
          available: [product.available, Validators.required]
        });
      });
  }

  onSaveEditProduct() {
    this.submitted = true;
    if(this.productFormGroup?.invalid) return;
    let message: string = 'Updated successfull for this product n° ' + this.productId;
    this.productService.updateProduct(this.productFormGroup?.value)
      .subscribe(data => {
        this.router.navigateByUrl('/products');
        this.notifyService.showSuccess(message, 3000);
      })
  }
}
