import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
    selector: 'app-rxjs',
    templateUrl: './rxjs.component.html',
    styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {
    subscription: Subscription;

    constructor() {
        this.subscription = this.regresaObservable()
            //.pipe(retry(3))
            .subscribe(
                numero => {
                    console.log('subs', numero);
                },
                error => console.error(error),
                () => console.log('complete')
            );
    }

    ngOnInit() {}

    regresaObservable(): Observable<any> {
        return new Observable((observer: Subscriber<any>) => {
            let contador = 0;
            let intervalo = setInterval(() => {
                contador++;

                const salida = { valor: contador };

                observer.next(salida);
                // if (contador === 3) {
                //     clearInterval(intervalo);
                //     observer.complete();
                // }
            }, 1000);
        }).pipe(
            map(response => response.valor),
            filter((valor, index) => {
                if (valor % 2 === 1) {
                    // impar
                    return true;
                } else {
                    // par
                    return false;
                }
            })
        );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
