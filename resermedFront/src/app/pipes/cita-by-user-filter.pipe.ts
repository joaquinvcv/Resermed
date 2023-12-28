import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'citaByUserFilter'
})
export class CitaByUserFilterPipe implements PipeTransform {

  transform(items: any[], usuarioId: number | null ): any[] {
    if (usuarioId == null) {
      return items;
    }
    return items.filter(item => item.UsuarioId == usuarioId);
  }


}
