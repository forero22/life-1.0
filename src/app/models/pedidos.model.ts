import { UUID } from 'angular2-uuid';
import { BaseDatabaseModel, BaseDto } from './base-dto.model';
import { ClientesDto } from './clientes.model';
import { ProductosDto } from './productos.model';

export class PedidosModel extends BaseDatabaseModel {
  public uid: string;
  public pagado: boolean;
  public autorizacion: string;
  public pagoId: string;
  public productoId: string;
  public fecha: string;
  public observaciones: string;
  public direccion: string;
  public calificacion: number;
  public cancelado: string;
  public despachado: string;
  public entregado: string;
  public cantidad: number;
  public cliente: ClientesDto;
  public producto: ProductosDto;

  constructor(id: string, uid: string, pagado: boolean, pagoId: string, autorizacion: string, fecha: string, observaciones: string, direccion: string, calificacion: number, cancelado: string, despachado: string, entregado: string, cantidad: number, productoId: string) {
    super();
    this.id = id;
    this.uid = uid;
    this.pagado = pagado;
    this.pagoId = pagoId;
    this.productoId = productoId;
    this.autorizacion = autorizacion;
    this.fecha = fecha;
    this.observaciones = observaciones;
    this.direccion = direccion;
    this.calificacion = calificacion;
    this.cancelado = cancelado;
    this.despachado = despachado;
    this.entregado = entregado;
    this.cantidad = cantidad;
  }

  public static emptySurvey(): PedidosModel {
    return new PedidosModel(UUID.UUID(), null, null, null, null, null, null, null, null, null, null, null, null, null);
  }

  public toDto(): PedidosDto {
    return {
      id: this.id,
      uid: this.uid,
      pagado: this.pagado,
      pagoId: this.pagoId,
      productoId: this.productoId,
      autorizacion: this.autorizacion,
      fecha: this.fecha,
      observaciones: this.autorizacion,
      direccion: this.direccion,
      calificacion: this.calificacion,
      despachado: this.despachado,
      entregado: this.entregado,
      cantidad: this.cantidad,
      cliente: null,
      producto: null
    };
  }

}

export interface PedidosDto extends BaseDto {
  pagoId: string;
  uid: string;
  productoId: string;
  pagado: boolean;
  autorizacion: string;
  fecha: string;
  observaciones: string;
  direccion: string;
  calificacion: number;
  despachado: string;
  entregado: string;
  cantidad: number;
  cliente: ClientesDto;
  producto: ProductosDto;
}
