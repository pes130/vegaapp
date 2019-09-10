import { Component, OnInit } from '@angular/core';
import { DataLocalService } from 'src/app/services/data-local.service';
import { Operacion } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  operaciones:Operacion[] = [];

  constructor(private dataLocalService: DataLocalService) {

  }

  ngOnInit(): void {
    this.dataLocalService.cargarOperaciones().then(ops => {
      this.operaciones = ops;
    });
  }

}
