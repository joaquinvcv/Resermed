import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'especialidadFilter'
})
export class EspecialidadFilterPipe implements PipeTransform {

  transform(items: any[], term: string): any[] {
    // console.log(term);
    if (!term) {
      return items;
    }

    return items.filter(item => 
      item.especialidad.toLowerCase().includes(term.toLowerCase())
      );
  }

}
