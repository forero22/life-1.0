import { UUID } from 'angular2-uuid';
import { BaseDatabaseModel, BaseDto } from './base-dto.model';

export class ProductosModel extends BaseDatabaseModel {

  public activo: boolean;
  public agotado: boolean;
  public categoriaId: string;
  public descripcion: string;
  public descuento: number;
  public existencia: number;
  public imagen: string;
  public precio: number;
  public presentacion: string;
  public producto: string;

  constructor(id: string, activo: boolean, agotado: boolean, categoriaId: string, descripcion: string, descuento: number, existencia: number, imagen: string, precio: number, presentacion: string, producto: string) {
    super();
    this.id = id;
    this.activo = activo;
    this.agotado = agotado;
    this.categoriaId = categoriaId;
    this.descripcion = descripcion;

    this.descuento = descuento;
    this.existencia = existencia;
    this.descripcion = imagen;
    this.precio = precio;
    this.presentacion = presentacion;
    this.producto = producto;
  }

  public static emptySurvey(): ProductosModel {
    return new ProductosModel(UUID.UUID(), null, null, null, null, null, null, null, null, null, null);
  }

  public toDto(): ProductosDto {
    return {
      id: this.id,
      activo: this.activo,
      agotado: this.agotado,
      categoriaId: this.categoriaId,
      descripcion: this.descripcion,
      descuento: this.descuento,
      existencia: this.existencia,
      imagen: this.imagen,
      precio: this.precio,
      presentacion: this.presentacion,
      producto: this.producto
    };
  }

}

export interface ProductosDto extends BaseDto {
  activo: boolean;
  agotado: boolean;
  categoriaId: string;
  descripcion: string;
  descuento: number;
  existencia: number;
  imagen: string;
  precio: number;
  presentacion: string;
  producto: string;
}
