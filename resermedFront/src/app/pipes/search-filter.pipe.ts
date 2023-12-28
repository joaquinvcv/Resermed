import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(items: any[], term: string): any[] {
    // console.log(term);
    if (!term) {
      return items;
    }

    return items.filter(item => 
      item.nombre.toLowerCase().includes(term.toLowerCase())
      );
  }

}
