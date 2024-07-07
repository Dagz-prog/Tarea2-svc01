import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IProduct } from "../../../interfaces";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-categories-form",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./categories-form.component.html",
  styleUrl: "./categories-form.component.scss",
})
export class CategoriesFormComponent {
  @Input() category: any = {
    name: "",
    description: "",
  };

  @Input() title: string = "";

  @Output() callParentEvent: EventEmitter<IProduct> =
    new EventEmitter<IProduct>();

  addEditCategory() {
    this.callParentEvent.emit(this.category);
  }
}