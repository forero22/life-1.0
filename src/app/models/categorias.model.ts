import { UUID } from 'angular2-uuid';
import { BaseDatabaseModel, BaseDto } from './base-dto.model';
import { ProductosDto } from './productos.model';

export class CategoriasModel extends BaseDatabaseModel {

  public servicio: boolean;
  public imagen: string;
  public categoria: string;
  public productos: ProductosDto[];

  constructor(id: string, servicio: boolean, categoria: string, imagen: string) {
    super();
    this.id = id;
    this.servicio = servicio;
    this.categoria = categoria;
    this.imagen = imagen;
  }

  public static emptySurvey(): CategoriasModel {
    return new CategoriasModel(UUID.UUID(), null, null, null);
  }

  public toDto(): CategoriasDto {
    return {
      id: this.id,
      servicio: this.servicio,
      categoria: this.categoria,
      imagen: this.imagen,
      productos: null
    };
  }

}

export interface CategoriasDto extends BaseDto {
  categoria: string;
  servicio: boolean;
  imagen: string;
  productos: ProductosDto[];
}
