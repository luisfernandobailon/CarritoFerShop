import { IProduct } from './../interfaces/iproduct';

import { set, get } from 'lodash-es';

export class Product implements IProduct {

    constructor(data) {
        set(this, 'data', data);
    }

    get price(): number {
        return get(this, 'data.price');
    }

    get name(): string {
        return get(this, 'data.name');
    }

    get img(): string {
        return get(this, 'data.img');
    }

    get quantity(): number {
        return get(this, 'data.quantity');
    }

    set quantity(value: number) {
        set(this, 'data.quantity', value);
    }

    /**
     * Devuelve el precio total de un producto
     */
    totalPrice() {
        // Empezamos con el precio del propio producto
        let total = this.price;
        return total;
    }

}
