import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ResultadoService } from '../services/resultado.service';

@Component({
    selector: 'app-resultado',
    templateUrl: 'resultado.component.html',
    styleUrls: ['./resultado.component.scss']
})

export class ResultadoComponent implements OnInit {
    resultado: Object = {
        x: {},
        z: 0,
        ilimitada: true,
    };
    keys: string[] = []

    constructor(
        private service: ResultadoService,
        private router: Router,
    ) { }

    ngOnInit() { 
        this.service.valueChange.subscribe(obj => {
            this.resultado['x'] = obj['x'];
            this.resultado['z'] = obj['z'];
            this.resultado['ilimitada'] = obj['ilimitada'];

            this.keys = Object.keys(this.resultado['x']);
            console.log(this.resultado)
        });
    }

    reset() {
        this.router.navigate(['menu']);
    }
}