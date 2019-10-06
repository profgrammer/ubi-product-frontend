import { Component, OnInit, APP_INITIALIZER } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  qlen: number;
  subscription: Subscription;
  i = 0;

  constructor(public productService: ProductService) {
    this.init();
  }

  init() {
    this.productService.getAllProducts().subscribe(result => {
      const products = result.products;
      const current = [];
      const queue = [];
      products.forEach((element, index) => {
        if (index < 6) {
          current.push(element);
        } else {
          queue.push(element);
        }
      });
      console.log(current, queue);
      this.productService.setCurrent(current);
      this.productService.setQueue(queue);
      this.qlen = this.productService.getQueue().length;
    });
  }

  ngOnInit() {
    const source = interval(30000);
    this.subscription = source.subscribe(val => this.shiftItems());
  }

  shiftItems() {
    if (this.qlen === 0) {
      return;
    }
    const current = this.productService.getCurrent();
    const queue = this.productService.getQueue();
    current[this.i] = queue.shift();
    this.qlen = queue.length;
    this.i = (this.i + 1) % 6;
    this.productService.setCurrent(current);
    this.productService.setQueue(queue);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
