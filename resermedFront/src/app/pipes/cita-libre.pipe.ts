import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'citaLibre'
})
export class CitaLibrePipe implements PipeTransform {

  transform(items: any[]): any[] {
    if (!items || !Array.isArray(items)) {
      return [];
    }

    return items.filter((item) => item.libre);
  }
}
