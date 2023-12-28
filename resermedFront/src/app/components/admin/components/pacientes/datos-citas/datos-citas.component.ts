import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ICita, IMedico, IUsuario } from 'src/app/interfaces/interfaces';
import { CitasService } from 'src/app/services/citas.Service';
import { MedicoService } from 'src/app/services/medico.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'datos-citas',
  templateUrl: './datos-citas.component.html',
  styleUrls: ['./datos-citas.component.scss']
})
export class DatosCitasComponent implements OnChanges{
  
  @Input() datos!:ICita[];
  indice!:number;
  @Output()
  public pacienteEmitter: EventEmitter<{user1: IUsuario,cita: ICita,index: number}>= new EventEmitter();

  constructor(public medicoService: MedicoService, public citaService: CitasService,private usuarioS:UsuarioService,private cdn: ChangeDetectorRef){}
  ngOnChanges(changes: SimpleChanges): void {
    this.cdn.detectChanges();
  }

  capturarValor(item:ICita,i:number){
    
    this.usuarioS.getUsuarioById(item.UsuarioId).subscribe(user=>{
      let user1 = user;
      let cita = item;
      let index = i;
      this.indice = index;
      this.pacienteEmitter.emit({user1,cita,index});
    });

}
}
