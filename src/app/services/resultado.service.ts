import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ResultadoService {

    private subject = new BehaviorSubject<Object>({});
    public valueChange = this.subject.asObservable();

    constructor( ) { }

    set(x: {}, z: number, ilimitada:boolean) {
        this.subject.next({
            x: x,
            z: z,
            ilimitada: ilimitada,
        });
    };
}