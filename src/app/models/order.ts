import { Product } from 'src/app/models/product';
import { IOrder } from './../interfaces/iorder';
import { set, find, cloneDeep, isEqual, get, unset, remove, forEach } from 'lodash-es';

export class Order implements IOrder {

    constructor(data) {
        set(this, 'data', data);
        this.productsOrder = [];
    }

    get productsOrder(): Product[] {
        return get(this, 'data.productsOrder');
    }

    set productsOrder(value: Product[]) {
        set(this, 'data.productsOrder', value);
    }

    /**
     * Añade un producto al pedido.
     * En caso de que exista, se incrementa la cantidad, sino lo añade con cantidad 1
     * @param product 
     */
    addProduct(product: Product) {

        // Busco el producto
        // El producto que viene no tiene una propiedad llamada quantity,
        // esta la creamos al meterlo en el pedido
        const productFound = find(this.productsOrder, p => {
            // Creo una copia del producto
            let copy = cloneDeep(p);
            // Quito la cantidad
            unset(copy, 'data.quantity');
            return isEqual(p, product);
        })

        if (productFound) {
            // Si existe el producto, incremento la cantidad
            product.quantity++;
        } else {
            // Sino existe el producto, le creo la propiedad quantity y lo meto en el array
            product.quantity = 1;
            this.productsOrder.push(product);
        }

    }

    /**
     * Añade en uno mas la cantidad del producto pasado
     * @param product producto a incrementar
     */
    oneMoreProduct(product: Product) {
        product.quantity++;
    }

    /**
     * Quito en uno la cantidad del producto pasado
     * @param product producto a restar
     */
    oneLessProduct(product: Product) {
        product.quantity--;
        // Si la cantidad es cero, se borra de los productos
        if (product.quantity === 0) {
            // IMPORTANTE: en este caso no es necesario modificar ningun producto,
            // ya que en este caso estaran con las mismas propiedades
            remove(this.productsOrder, p => isEqual(p, product))
        }
    }


    /**
     * Quito el producto del carrito
     * @param product producto a quitar
     */
    removeProduct(product: Product) {
        product.quantity = 0;
        remove(this.productsOrder, p => isEqual(p, product))

    }

    /**
     * Devuelve el numero de productos en el pedido
     */
    numProducts() {
        return this.productsOrder.length;
    }

    /**
     * Devuelve el precio total de un pedido
     */
    totalOrder() {

        let total = 0;

        // Recorro los productos y sumo los productos
        forEach(this.productsOrder, p => {
            total += p.totalPrice() * p.quantity;
        });

        return total;
    }

}
