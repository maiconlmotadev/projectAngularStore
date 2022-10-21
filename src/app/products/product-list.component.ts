import {Component, OnDestroy, OnInit} from "@angular/core";
import {IProduct} from "./product";
import {ProductService} from "./product.service";
import {Subscription} from "rxjs";

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService],
})

export class ProductListComponent implements OnInit, OnDestroy{

  pageTitle: string = 'Lista de Produtos';
  imageWidth = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  errorMessage: string = "";
  sub!: Subscription;

  private _listFilter: string = " ";
  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value) {
    this._listFilter = value;
    console.log("In setter:", value);
    this.filteredProducts = this.performFilter(value);
  }

  filteredProducts: IProduct[] = [];
  products: IProduct[] = [ ];

  toggleImage(): void  {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {

    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  constructor(private productService: ProductService) { }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product:IProduct) =>
      product.productName.toLocaleLowerCase().includes(filterBy));
  }

  onRatingClicked(message: string) {
      this.pageTitle = "Lista de Produtos: " + message;

    }
}
