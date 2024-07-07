import { Injectable, signal } from "@angular/core";
import { BaseService } from "./base-service";
import { IProduct } from "../interfaces";

@Injectable({
  providedIn: "root",
})
export class ProductService extends BaseService<IProduct> {
  protected override source: string = "products";

  private productListSignal = signal<IProduct[]>([]);

  get products$() {
    return this.productListSignal;
  }

  public getAll() {
    this.findAll().subscribe({
      next: (res: any) => {
        this.productListSignal.set(res);
        console.log("res: ", res);
      },
      error: (err: any) => {
        console.log("err: ", err);
      },
    });
  }

  public save(product: IProduct) {
    console.log("product: ", product);
    this.add(product).subscribe({
      next: (res: any) => {
        this.productListSignal.update((products: IProduct[]) => [
          res,
          ...products,
        ]);
        console.log("res: ", res);
      },
      error: (err: any) => {
        console.log("err: ", err);
      },
    });
  }

  public update(product: IProduct) {
    this.edit(product.id, product).subscribe({
      next: () => {
        const updatedProduct = this.productListSignal().map((p) =>
          p.id === product.id ? product : p
        );
        this.productListSignal.set(updatedProduct);
      },
      error: (err: any) => {
        console.log("err: ", err);
      },
    });
  }

  public delete(id: number) {
    this.del(id).subscribe({
      next: () => {
        const deletedProduct = this.productListSignal().filter(
          (p: IProduct) => p.id !== id
        );
        this.productListSignal.set(deletedProduct);
      },
      error: (err: any) => {
        console.log("err: ", err);
      },
    });
  }
}
