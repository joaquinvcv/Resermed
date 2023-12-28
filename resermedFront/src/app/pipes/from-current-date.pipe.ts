import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fromCurrentDate'
})
export class FromCurrentDatePipe implements PipeTransform {
  
  transform(items: any[]): any[] {
    if (!items || !Array.isArray(items)) {
      return [];
    }

    const currentDate = new Date();

    return items.filter((item) => {
      if (!item || !item.fecha || !item.hora_inicio) return false; 

      const citaDateTime = new Date(item.fecha + ' ' + item.hora_inicio); 

      return citaDateTime >= currentDate;
    });
  }
}
