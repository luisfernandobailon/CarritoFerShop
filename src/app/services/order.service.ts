import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { forEach } from 'lodash-es';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  // Pedido actual
  private _order: Order;
  // Numero de pedido actual
  private _numOrder: number;

  constructor(private http: HttpClient) {
    this._order = new Order({});
    this._numOrder = 1;
  }

  /**
   * Devuelve el numero de pedido actual
   */
  get numOrder(): number {
    return this._numOrder;
  }

  /**
   * Setea el numero de pedido actual
   */
  set numOrder(value: number) {
    this._numOrder = value;
  }

  /**
   * Devuelve el pedido actual
   */
  get order(): Order {
    return this._order;
  }

  /**
   * Setea el pedido
   */
  set order(value: Order) {
    this._order = value;
  }


  /**
   * Limpia la orden, creando una nueva orden
   */
  clearOrder() {
    this.order = new Order({});
  }

}
