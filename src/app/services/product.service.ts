import { Product } from './../models/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { cloneDeep, get } from 'lodash-es';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // Datos del fichero json se va modificando
  private data: any;
  // Datos del fichero json inicial
  private dataOriginal: any;
  // Productos de una categoria
  private _productsSelected: Product[];
  // Producto a mostrar
  private _productSelected: Product;

  constructor(private http: HttpClient) { }

  /**
   * Devuelve las categorias
   */
  get categories() {
    return get(this.data, 'categories');
  }

  /**
   * Devuelve los productos seleccionados
   */
  get productsSelected(): Product[] {
    return this._productsSelected;
  }

  /**
   * Productos de una categoria
   */
  set productsSelected(value: Product[]) {
    this._productsSelected = value;
  }

  /**
   * Devuelvo el producto seleccionado
   */
  get productSelected(): Product {
    return this._productSelected;
  }
  /**
   * Seteo el producto elegido
   */
  set productSelected(value: Product) {
    this._productSelected = value;
  }

  /**
   * Obtengo los datos de products.json
   * Guardo el estado original en un atributo
   */
  public getData() {
    return new Promise((resolve, reject) => {
      this.http.get('assets/data/products.json').subscribe(data => {
        this.data = cloneDeep(data);
        this.dataOriginal = cloneDeep(data);
        resolve(true);
      }, error => {
        console.error('Error al recuperar los productos: ' + error);
        reject(true);
      })
    })
  }

  /**
   * Resetea los datos al fichero json original.
   */
  resetProducts() {
    this.data = cloneDeep(this.dataOriginal);
  }

}
