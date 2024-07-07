import { Component, EventEmitter, input, Input, Output } from "@angular/core";
import { ICategory, IProduct } from "../../../interfaces";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-product-form",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./product-form.component.html",
  styleUrl: "./product-form.component.scss",
})
export class ProductFormComponent {
  @Input() updateProduct: IProduct = {
    name: "",
    qtyStock: 0,
    price: 0,
    description: "",
    category: {
      name: "",
    },
  };

  @Input() title: string = "";
  @Input() categories: ICategory[] = [];

  @Output() callParentEvent: EventEmitter<IProduct> =
    new EventEmitter<IProduct>();

  addEditProduct() {
    this.callParentEvent.emit(this.updateProduct);
  }
}
