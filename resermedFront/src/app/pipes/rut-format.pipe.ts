import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rutFormat'
})
export class RutFormatPipe implements PipeTransform {

  transform(value:string): unknown {
    if (!value) return '';

    // Eliminar cualquier carácter que no sea un número ni la letra 'k'
    value = value.replace(/[^0-9kK]/g, '');

    if (value.length <= 1) return value;

    // Separar el dígito verificador del cuerpo del RUT
    const rutBody = value.slice(0, -1);
    const rutDV = value.slice(-1).toUpperCase();

    // Formatear el cuerpo del RUT con puntos
    const formattedBody = rutBody.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Unir el cuerpo formateado con el dígito verificador
    return `${formattedBody}-${rutDV}`;
  }

}
