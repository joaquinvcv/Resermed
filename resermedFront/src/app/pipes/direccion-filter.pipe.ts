import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'direccionFilter'
})
export class DireccionFilterPipe implements PipeTransform {

  transform(items: any[], term: string): any[] {
    console.log(term);
    if (!term) {
      return items;
    }

    return items.filter(item => 
      item.direccion.toLowerCase().includes(term.toLowerCase())
      );
  }


}
