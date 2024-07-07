import { Component, inject, OnInit } from "@angular/core";
import { LoaderComponent } from "../../components/loader/loader.component";
import { ModalComponent } from "../../components/modal/modal.component";
import { ProductListComponent } from "../../components/products/product-list/product-list.component";
import { ProductService } from "../../services/product.service";
import { ProductFormComponent } from "../../components/products/product-form/product-form.component";
import { IProduct } from "../../interfaces";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { CategoryService } from "../../services/category.service";

@Component({
  selector: "app-products",
  standalone: true,
  templateUrl: "./products.component.html",
  styleUrl: "./products.component.scss",
  imports: [
    LoaderComponent,
    ModalComponent,
    ProductListComponent,
    ModalComponent,
    ProductFormComponent,
    RouterModule,
  ],
})
export class ProductsComponent implements OnInit {
  public productService = inject(ProductService);
  public categoryService = inject(CategoryService);
  public modalService = inject(NgbModal);
  public route: ActivatedRoute = inject(ActivatedRoute);
  public authService: AuthService = inject(AuthService);
  public routeAuthorites: string[] = [];
  public isAllowed: boolean = false;

  ngOnInit(): void {
    this.authService.getUserAuthorities();
    this.productService.getAll();
    this.categoryService.getAll();
    this.route.data.subscribe((data) => {
      this.routeAuthorites = data["authorities"] ? data["authorities"] : [];
      this.isAllowed = this.authService.areActionsAvailable(
        this.routeAuthorites
      );
    });
  }

  onFormEventCalled(param: any) {
    console.log("PAram", param);
    this.productService.save(param);
    this.modalService.dismissAll();
  }
}
