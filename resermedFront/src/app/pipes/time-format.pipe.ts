import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';

    // Assuming the input time is in "HH:mm:ss" format
    const [hours, minutes, seconds] = value.split(':');
    return `${hours}:${minutes}`;
  }

}
