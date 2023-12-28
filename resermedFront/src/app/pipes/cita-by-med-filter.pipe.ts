import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'citaByMedFilter'
})
export class CitaByMedFilterPipe implements PipeTransform {

  transform(items: any[], medicoId: number | null ): any[] {
    if (medicoId == null) {
      return items;
    }
        
    return items.filter(item => item.MedicoId == medicoId);
  }


}
