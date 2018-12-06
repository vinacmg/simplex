import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MenuService {
    obj = {
        variaveis: 2,
        restricoes: 2
    }
    private subject = new BehaviorSubject<Object>(this.obj);
    public valueChange = this.subject.asObservable();

    constructor() { }

    set(variaveis: number, restricoes: number) {
        this.obj.variaveis = variaveis;
        this.obj.restricoes = restricoes;
        this.subject.next(this.obj);
    };
}