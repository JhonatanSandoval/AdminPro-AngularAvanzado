import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {
  transform(img: string, tipo: string = 'usuarios'): any {
    let url = `${URL_SERVICIOS}/img/`;
    if (!img) {
      return url + 'usuarios/no-img.jpg';
    }
    if (img.indexOf('https') >= 0) {
      // de Google
      return img;
    }
    switch (tipo) {
      case 'usuarios':
        return url + '/usuarios/' + img;
      case 'medicos':
        return url + '/medicos/' + img;
      case 'hospital':
        return url + '/hospitales/' + img;
      default:
        console.log('regresando img por default');
        return url + 'no-img.jpg';
    }
  }
}
