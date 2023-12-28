import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'citaTomada'
})
export class CitaTomadaPipe implements PipeTransform {

  transform(items: any[]): any[] {
    if (!items || !Array.isArray(items)) {
      return [];
    }

    return items.filter((item) => item.libre == false);
  }

}
