import { CommonModule } from "@angular/common";
import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { ICategory } from "../../../interfaces";
import { CategoryService } from "../../../services/category.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalComponent } from "../../modal/modal.component";
import { CategoriesFormComponent } from "../categories-form/categories-form.component";

@Component({
  selector: "app-categories-list",
  standalone: true,
  imports: [CommonModule, ModalComponent, CategoriesFormComponent],
  templateUrl: "./categories-list.component.html",
  styleUrl: "./categories-list.component.scss",
})
export class CategoriesListComponent implements OnChanges {
  @Input() categoryList: ICategory[] = [];
  @Input() isAllowed: boolean = false;

  private categoryService = inject(CategoryService);
  public modalService = inject(NgbModal);

  public selectedCategory: ICategory = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["isAllowed"]) {
      console.log("isAllowed: ", this.isAllowed);
    }
  }
  showDetailModal(category: ICategory, modal: any) {
    console.log("category: ", category, "modal: ", modal);
    this.selectedCategory = { ...category };
    modal.show();
  }
  onFormEventCalled(param: any) {
    console.log("PAram", param);
    this.categoryService.update(param);
    this.modalService.dismissAll();
  }

  deleteCategory(id: number) {
    this.categoryService.delete(id);
  }
}
