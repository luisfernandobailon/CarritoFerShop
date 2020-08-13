
import { OrderService } from 'src/app/services/order.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Input() numberProducts : string = '0';

  // Modales
  @ViewChild("modal_order", { static: false }) modal_order;
  @ViewChild("modal_num_order", { static: false }) modal_num_order;

  constructor(
    private modalService: NgbModal,
    public orderService: OrderService
  ) { }

  ngOnInit() {
  }

  /**
   * Muestra el modal del pedido, se queda pendiente en el caso de que pulsemos algun boton del pie
   */
  openModalOrder() {
    this.modalService.open(this.modal_order, { windowClass: "my-modal-dialog" }).result.then(result => {
      // Si hemos pulsado el boton de hacer pedido, crearemos el pedido
      if (result === 'yes') {
        console.log("Vamos a crear el pedido");
        // Creo el pedido desde el servicio

        console.log("se limpia la orden ");
        // Limpio la orden
        this.orderService.clearOrder();

        // Abro el modal para mostrar el numero de pedido
        this.modalService.open(this.modal_num_order);



      } else {
        console.log("Se ha cancelado el pedido");
      }
    })
  }

}
