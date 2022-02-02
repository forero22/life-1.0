import { UUID } from 'angular2-uuid';
import { BaseDatabaseModel, BaseDto } from './base-dto.model';
import { TrabajadorasDto } from './trabajadoras.model';

export class ClientesModel extends BaseDatabaseModel {

  public servicio: boolean;
  public imagen: string;
  public categoria: string;
  public trabajadora: TrabajadorasDto;

  constructor(id: string, servicio: boolean, categoria: string, imagen: string) {
    super();
    this.id = id;
    this.servicio = servicio;
    this.categoria = categoria;
    this.imagen = imagen;
  }

  public static emptySurvey(): ClientesModel {
    return new ClientesModel(UUID.UUID(), null, null, null);
  }

  public toDto(): ClientesDto {
    return {
      id: this.id,
      servicio: this.servicio,
      categoria: this.categoria,
      imagen: this.imagen,
      trabajadora: null
    };
  }

}

export interface ClientesDto extends BaseDto {
  categoria: string;
  servicio: boolean;
  imagen: string;
  trabajadora: TrabajadorasDto;
}
