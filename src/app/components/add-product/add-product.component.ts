import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  submitted = false;
  success = false;
  addProduct: FormGroup;

  constructor(private formBuilder: FormBuilder, private productService: ProductService) { }

  ngOnInit() {
    this.addProduct = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  onFileSelect(event): void{
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.addProduct.get('image').setValue(file);
    }
  }

  onSubmit(e: Event) {
    this.submitted = true;
    if (this.addProduct.invalid) {
      return;
    }
    this.success = true;
    const fd = new FormData();
    fd.append('title', this.addProduct.get('title').value);
    fd.append('description', this.addProduct.get('description').value);
    if(typeof this.addProduct.get('image') !== 'string'){
      fd.append('image', this.addProduct.get('image').value);
    }
    this.productService.addProduct(fd).subscribe(result => {
      if (result && result.success) {
        alert('product added successfully');
      } else {
        alert('There was an error adding the product, please try again.');
      }
    });
  }

}
