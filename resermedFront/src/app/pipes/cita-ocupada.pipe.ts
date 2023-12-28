import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'citaOcupada'
})
export class CitaOcupadaPipe implements PipeTransform {

  transform(items: any[]): any[] {
    if (!items || !Array.isArray(items)) {
      return [];
    }

    return items.filter((item) => !item.libre);
  }
}
