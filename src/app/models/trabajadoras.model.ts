import { UUID } from 'angular2-uuid';
import { BaseDatabaseModel, BaseDto } from './base-dto.model';

export class TrabajadorasModel extends BaseDatabaseModel {

  public activa: boolean;
  public imagen: string;
  public trabajadora: string;
  public direccion: string;
  public documento: string;
  public nacimiento: string;
  public telefono: string;

  constructor(id: string, activa: boolean, trabajadora: string, imagen: string, direccion: string, documento: string, nacimiento: string, telefono: string) {
    super();
    this.id = id;
    this.activa = activa;
    this.trabajadora = trabajadora;
    this.imagen = imagen;
    this.direccion = direccion;
    this.documento = documento;
    this.nacimiento = nacimiento;
    this.telefono = telefono;
  }

  public static emptySurvey(): TrabajadorasModel {
    return new TrabajadorasModel(UUID.UUID(), null, null, null, null, null, null, null);
  }

  public toDto(): TrabajadorasDto {
    return {
      id: this.id,
      activa: this.activa,
      trabajadora: this.trabajadora,
      imagen: this.imagen,
      direccion: this.direccion,
      documento: this.documento,
      nacimiento: this.nacimiento,
      telefono: this.telefono,
    };
  }

}

export interface TrabajadorasDto extends BaseDto {
  trabajadora: string;
  activa: boolean;
  imagen: string;
  direccion: string;
  documento: string;
  nacimiento: string;
  telefono: string;
}
