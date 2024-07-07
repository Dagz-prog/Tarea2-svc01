import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { ICategory, IProduct } from "../../../interfaces";
import { CommonModule } from "@angular/common";
import { ModalComponent } from "../../modal/modal.component";
import { ProductFormComponent } from "../product-form/product-form.component";
import { ProductService } from "../../../services/product.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-product-list",
  standalone: true,
  imports: [CommonModule, ModalComponent, ProductFormComponent],
  templateUrl: "./product-list.component.html",
  styleUrl: "./product-list.component.scss",
})
export class ProductListComponent implements OnChanges {
  @Input() productList: IProduct[] = [];
  @Input() isAllowed: boolean = false;

  private productService = inject(ProductService);
  public modalService = inject(NgbModal);
  public selectedProduct: IProduct = {};
  categoryService: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["isAllowed"]) {
      console.log("isAllowed: ", this.isAllowed);
    }
  }
  showDetailModal(product: IProduct, modal: any) {
    console.log("product: ", product, "modal: ", modal);
    this.selectedProduct = { ...product };
    modal.show();
  }

  onFormEventCalled(param: any) {
    console.log("PAram", param);
    this.productService.update(param);
    this.modalService.dismissAll();
  }

  deleteProduct(id: number) {
    this.productService.delete(id);
  }
}
