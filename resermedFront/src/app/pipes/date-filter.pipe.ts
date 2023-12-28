import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFilter'
})
export class DateFilterPipe implements PipeTransform {


  transform(items: any[], targetDate: Date): any[] {
    if (!items || !Array.isArray(items) || !targetDate || typeof targetDate !== 'string') {
      return [];
    }

    const parsedTargetDate = new Date(targetDate); // Convert targetDate to Date object

    return items.filter((cita) => {
      const citaDate = new Date(cita.fecha); // Convert ICita.date to Date object
      return citaDate.getTime() === parsedTargetDate.getTime();
    });
  }

}
