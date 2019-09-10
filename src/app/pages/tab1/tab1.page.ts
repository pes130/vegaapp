import { Component, ViewChild, OnInit } from '@angular/core';
import { Conversion, Operacion } from 'src/app/interfaces/interfaces';
import { IonSegment } from '@ionic/angular';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {


  @ViewChild(IonSegment, {static: true}) segment: IonSegment;
  
  conversionesArr:string[] = ["Ha-m2", "m2-Ha", "th-m2"];
  cantidadUsuario = '';
  resultado = 0;
  mostrarResultado:boolean = false;

  conversionesMap:Record<string, Conversion> = {
    "Ha-m2": {
      origen: "ha",
      origenTit: "hectáreas",
      destino: "metros",
      destinoTit: "Metros cuadrados",
      equivalencia: 10000
    },
    "m2-Ha": {
      origen: "metros",
      origenTit: "Metros cuadrados",
      destino: "ha",
      destinoTit: "hectáreas",
      equivalencia: 0.0001
    },
    "th-m2": {
      origen: "ta",
      origenTit: "tahúllas",
      destino: "metros",
      destinoTit: "Metros cuadrados",
      equivalencia: 1118
    }
    
  }
  
  conversion:string = '';
  conversionObject: Conversion;

  constructor(private dataLocalService: DataLocalService) {}

  ngOnInit(): void {
    this.conversion =  this.conversionesArr[0]
    this.segment.value = this.conversion;
    this.conversionObject = this.conversionesMap[this.conversion];
    this.cantidadUsuario = '0';
  }


  cambioConversion(event){
    this.conversion = event.detail.value;
    this.conversionObject = this.conversionesMap[this.conversion];
    this.cantidadUsuario = '0';
    this.mostrarResultado = false;

  }

  realizarCalculo() {
    const cantidadUsuarioNum = Number(this.cantidadUsuario);
    if(!isNaN(cantidadUsuarioNum)){
      this.resultado = cantidadUsuarioNum*this.conversionObject.equivalencia;
      this.mostrarResultado = true;
      const op:Operacion = {
         cantidadOriginal: cantidadUsuarioNum,
         cantidadResultado: this.resultado,
         unidadDestino: this.conversionObject.destino,
         unidadOrigen: this.conversionObject.origen
      }
      this.dataLocalService.guardarOperacion(op);
    } else {
      this.resultado = 0;
      this.mostrarResultado = false;
    }
  }

  borrarResultadoPrevio(){
    if (this.mostrarResultado) {
      this.mostrarResultado = false;
    }
  }

}
