import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Operacion } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  historico: Operacion[] = [];

  constructor(private storage: Storage) { 

  }

  guardarOperacion(operacion: Operacion) {
    this.historico.unshift(operacion);
    this.storage.set('historico', this.historico);
  }

  async cargarOperaciones() {
    const operaciones = await this.storage.get('historico');
    this.historico = operaciones;
    return this.historico;
  }
}
