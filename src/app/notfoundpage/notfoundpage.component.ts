import { Component, OnInit } from '@angular/core';

declare function init_plugins();

@Component({
    selector: 'app-notfoundpage',
    templateUrl: './notfoundpage.component.html',
    styleUrls: ['./notfoundpage.component.css']
})
export class NotfoundpageComponent implements OnInit {
    anio: number = new Date().getFullYear();
    constructor() {}

    ngOnInit() {
        init_plugins();
    }
}
