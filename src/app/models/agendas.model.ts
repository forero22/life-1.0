import { UUID } from 'angular2-uuid';
import { BaseDatabaseModel, BaseDto } from './base-dto.model';
import { ClientesDto } from './clientes.model';

export class AgendasModel extends BaseDatabaseModel {
  public uid: string;
  public activa: boolean;
  public direccion: string;
  public clienteId: string;
  public fecha: string;
  public observaciones: string;
  public telefono: string;
  public trabajadoraId: string;
  public cliente: ClientesDto;

  constructor(id: string, uid: string, activa: boolean, clienteId: string, direccion: string, fecha: string, observaciones: string, telefono: string, trabajadoraId: string) {
    super();
    this.id = id;
    this.uid = uid;
    this.activa = activa;
    this.clienteId = clienteId;
    this.direccion = direccion;
    this.fecha = fecha;
    this.observaciones = observaciones;
    this.telefono = telefono;
    this.trabajadoraId = trabajadoraId;
  }

  public static emptySurvey(): AgendasModel {
    return new AgendasModel(UUID.UUID(), null, null, null, null, null, null, null, null);
  }

  public toDto(): AgendasDto {
    return {
      id: this.id,
      uid: this.uid,
      activa: this.activa,
      clienteId: this.clienteId,
      direccion: this.direccion,
      fecha: this.fecha,
      observaciones: this.direccion,
      telefono: this.telefono,
      trabajadoraId: this.trabajadoraId,
      cliente: null
    };
  }

}

export interface AgendasDto extends BaseDto {
  uid: string;
  clienteId: string;
  activa: boolean;
  direccion: string;
  fecha: string;
  observaciones: string;
  telefono: string;
  trabajadoraId: string;
  cliente: ClientesDto;
}
