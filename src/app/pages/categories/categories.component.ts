import { Component, inject, OnInit } from "@angular/core";
import { CategoriesListComponent } from "../../components/categories/categories-list/categories-list.component";
import { ModalComponent } from "../../components/modal/modal.component";
import { CategoriesFormComponent } from "../../components/categories/categories-form/categories-form.component";
import { CategoryService } from "../../services/category.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LoaderComponent } from "../../components/loader/loader.component";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-categories",
  standalone: true,
  templateUrl: "./categories.component.html",
  styleUrl: "./categories.component.scss",
  imports: [
    CategoriesListComponent,
    LoaderComponent,
    ModalComponent,
    CategoriesFormComponent,
  ],
})
export class CategoriesComponent implements OnInit {
  public categoryService = inject(CategoryService);
  public modalService = inject(NgbModal);
  public route: ActivatedRoute = inject(ActivatedRoute);
  public authService: AuthService = inject(AuthService);
  public routeAuthorites: string[] = [];
  public isAllowed: boolean = false;

  ngOnInit(): void {
    this.authService.getUserAuthorities();
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
    this.categoryService.save(param);
    this.modalService.dismissAll();
  }
}
