import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MenuService } from '../services/menu.service';
import { ResultadoService } from '../services/resultado.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-params',
  templateUrl: 'params.component.html',
  styleUrls: ['./params.component.scss']
})

export class ParamsComponent implements OnInit {
  paramsForm: FormGroup;
  variaveis:number = 0;
  restricoes:number = 0;
  var_index: Array<number> = [];
  rest_index: Array<number> = [];
  inputs = {};
  validator = [
    Validators.pattern('^-?[0-9]+([\.,]{1}[0-9]+)?$'),
    Validators.required,
  ];
  A: Array<Array<number>> = [];
  b: Array<number> = [];
  c: Array<number> = [];
  base = {};
  maisNegativo: number = 0;
  z: number = 0;

  constructor(
    private fb: FormBuilder,
    private menuService: MenuService,
    private resultadoService: ResultadoService,
    private router: Router,
  ) { 
    this.paramsForm = this.fb.group({
      'variaveis': ['', Validators.compose([
        Validators.pattern('^[0-9]*$'),
        Validators.required,
      ])],
      'restricoes': ['', Validators.compose([
        Validators.pattern('^[0-9]*$'),
        Validators.required,
      ])],
    });
  }

  ngOnInit() {
    this.menuService.valueChange.subscribe(obj => {
      this.inputs = {};
      this.variaveis = Number(obj['variaveis']);
      this.restricoes = Number(obj['restricoes']);
      this.var_index = [];

      for (var i = 1; i <= this.variaveis; i++) {
        this.var_index.push(i);
        this.inputs[`c${i}`] = ['', this.validator];
      }
      this.rest_index = []; 
      for (var i = 1; i <= this.restricoes; i++) {
        this.rest_index.push(i);
        this.inputs[`b${i}`] = ['', this.validator];
      }
      // [0,1,2,3,4,...] 

      for (var i = 1; i <= this.restricoes; i++) {
        for (var j = 1; j <= this.variaveis; j++) {
          this.inputs[`A${i}${j}`] = ['', this.validator];
        }
      }

      this.inputs['objetivo'] = ['', Validators.required];
      this.paramsForm = this.fb.group(this.inputs);
      this.base = {};
      for(var i = this.variaveis; i < (this.variaveis + this.restricoes); i++){
        this.base[String(i - this.variaveis)] = `x${i+1}`;
      }
    })
  }

  submitForm() {
    this.calcular();
    let r = '';
    
    let bool = this.solucaoOtima();
    while(!bool && r != 'ilimitada') {
      r = this.atualiza();
    }

    if(this.paramsForm.value.objetivo == 'min') {
      this.z = this.z*-1;
    }
    
    let result = {};
    let aux = {};

    for (var i = 0; i < this.variaveis; i++){
      result[this.base[String(i)]] = this.b[i];
    }

    for (var i = 0; i < this.variaveis; i++){
      if(result[`x${i+1}`]) {
        aux[`x${i+1}`] = result[`x${i+1}`];
      } else {
        aux[`x${i+1}`] = 0;
      }
    }
    let ilimitada: boolean;
    if(r === 'ilimitada') {
      ilimitada = true;
    } else {
      ilimitada = false;
    }

    this.resultadoService.set(aux, this.z, ilimitada);
    this.router.navigate(['resultado']);
  }

  calcular() {
    let linhaA = [];
    this.A = [];
    this.b = [];
    this.c = [];

    let inputs = this.paramsForm.value;
    let variaveis = Number(this.variaveis);
    let restricoes = Number(this.restricoes);

    for (var i = 1; i <= restricoes; i++) {
      for (var j = 1; j <= (variaveis + restricoes); j++) {
        if(j <= variaveis){
          linhaA.push(Number(inputs[`A${i}${j}`]));
        } else {
          (j == i + variaveis) ? linhaA.push(1) : linhaA.push(0);
        }
      }
      this.A.push(linhaA);
      linhaA = [];
    };

    for (var i = 1; i <= restricoes; i++) {
      this.b.push(Number(inputs[`b${i}`]));
    };

    for (var j = 1; j <= (variaveis + restricoes); j++) {
      if(j <= variaveis){
        (inputs.objetivo == 'min') ? this.c.push(Number(inputs[`c${j}`])) : this.c.push(Number(inputs[`c${j}`])*-1);
      } else {
        this.c.push(0);
      }
    };
    
  }

  solucaoOtima() {
    let variaveis = Number(this.variaveis);
    let restricoes = Number(this.restricoes);
    this.maisNegativo = 0;

    for (var i = 0; i < (variaveis + restricoes); i++) {
      if(this.c[i] < this.maisNegativo){
        this.maisNegativo = this.c[i];
      }
    };
    if(this.maisNegativo < 0) {
      return false;
    } else {
      return true;
    }
  }

  atualiza() {
    let variaveis = Number(this.variaveis);
    let restricoes = Number(this.restricoes);
    let index_entra:number;
    let index_sai:number;

    //qual entra
    for (var j = 0; j < (variaveis + restricoes); j++) {
      if(this.c[j] == this.maisNegativo){
        index_entra = j;
      }
    };

    //qual sai
    let sai = 9999999;
    index_sai = -33;
    for (var i = 0; i < restricoes; i++) {
      if(this.A[i][index_entra] > 0) {
        if(sai > (this.b[i]/this.A[i][index_entra])) {
          sai = (this.b[i]/this.A[i][index_entra])
          index_sai = i;
        };
      };
    };

    if(index_sai == -33) {
      return 'ilimitada';
    } else {
      this.base[String(index_sai)] = `x${index_entra + 1}`;
    }

    //pivotamento
    let pivo = this.A[index_sai][index_entra];
    let multiplicador = 1/pivo;
    for (var j = 0; j < (variaveis + restricoes); j++) {
      this.A[index_sai][j] = this.A[index_sai][j]*multiplicador;
    }
    this.b[index_sai] = this.b[index_sai]*multiplicador;

    pivo = this.A[index_sai][index_entra];

    for (var i = 0; i < index_sai; i++) {
      multiplicador = (this.A[i][index_entra])/pivo;
      for (var j = 0; j < (variaveis + restricoes); j++) {
        this.A[i][j] = this.A[i][j] - this.A[index_sai][j]*multiplicador;
      }
      this.b[i] = this.b[i] - this.b[index_sai]*multiplicador;
    }

    for (var i = (index_sai + 1); i < restricoes; i++) {
      multiplicador = (this.A[i][index_entra])/pivo;
      for (var j = 0; j < (variaveis + restricoes); j++) {
        this.A[i][j] = this.A[i][j] - this.A[index_sai][j]*multiplicador;
      }
      this.b[i] = this.b[i] - this.b[index_sai]*multiplicador;
    }
    
    multiplicador = (this.c[index_entra])/pivo;
    for (var j = 0; j < (variaveis + restricoes); j++) {
      this.c[j] = this.c[j] - this.A[index_sai][j]*multiplicador;
    }
    this.z = this.z - this.b[index_sai]*multiplicador;
    
    return 'testar_solucao'
  }

}