import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: any;

  constructor(public productService: ProductService) { }

  ngOnInit() {
  }

  getImageUrl() {
    return `${this.productService.BASE_URL}/products/images/${this.product.image_path}`;
  }

}
