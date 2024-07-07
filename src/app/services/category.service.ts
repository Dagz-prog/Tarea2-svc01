import { Injectable, signal } from "@angular/core";
import { BaseService } from "./base-service";
import { ICategory } from "../interfaces";

@Injectable({
  providedIn: "root",
})
export class CategoryService extends BaseService<ICategory> {
  protected override source: string = "categories";

  private categoryListSignal = signal<ICategory[]>([]);

  get categories$() {
    return this.categoryListSignal;
  }

  public getAll() {
    this.findAll().subscribe({
      next: (res: any) => {
        this.categoryListSignal.set(res);
        console.log("res: ", res);
      },
      error: (err: any) => {
        console.log("err: ", err);
      },
    });
  }

  public save(category: ICategory) {
    this.add(category).subscribe({
      next: (res: any) => {
        this.categoryListSignal.update((categories: ICategory[]) => [
          res,
          ...categories,
        ]);
        console.log("res: ", res);
      },
      error: (err: any) => {
        console.log("err: ", err);
      },
    });
  }

  public update(category: ICategory) {
    this.edit(category.id, category).subscribe({
      next: () => {
        const updatedCategory = this.categoryListSignal().map((c) =>
          c.id === category.id ? category : c
        );
        this.categoryListSignal.set(updatedCategory);
      },
      error: (err: any) => {
        console.log("err: ", err);
      },
    });
  }

  public delete(id: number) {
    this.del(id).subscribe({
      next: () => {
        const deletedCategory = this.categoryListSignal().filter(
          (c: ICategory) => c.id !== id
        );
        this.categoryListSignal.set(deletedCategory);
      },
      error: (err: any) => {
        console.log("err: ", err);
      },
    });
  }
}
