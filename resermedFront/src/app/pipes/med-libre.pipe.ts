import { Pipe, PipeTransform } from '@angular/core';
import { IMedico } from '../interfaces/interfaces';

@Pipe({
  name: 'medLibre'
})
export class MedLibrePipe implements PipeTransform {

  transform(value: any[]): any[] {
    return value.filter(item => item !== null && item !== undefined && item !== '');
  }

}
