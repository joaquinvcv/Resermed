import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IMedico } from 'src/app/interfaces/interfaces';
import { MedicoService } from 'src/app/services/medico.service';
import { RegistroService } from 'src/app/services/registro.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss']
})
export class ResultadosComponent implements OnInit {

  medicos: IMedico[] = [];
  searchTerm: string = '';
  filtroEspecialidad: string = '';
  filtroDireccion: string = '';
  message!: string;
  subs!: Subscription;
  especialidades: string [] = [
    'Cardiología',
    'Dermatología',
    'Endocrinología',
    'Fonoaudiología',
    'Gastrenterología',
    'Geriatría',
    'Ginecología',
    'Hematología',
    'Inmunología',
    'Kinesiología',
    'Medicina General',
    'Nefrología',
    'Neurología',
    'Nutrición',
    'Obstetricia',
    'Oftamología',
    'Oncología',
    'Odontología',
    'Otorrinolaringología',
    'Pediatría',
    'Psicología',
    'Psiquiatría',
    'Traumatología',
    'Urología'
  ];
  

  constructor(private medicoService: MedicoService) { }

  ngOnInit(): void {

    this.medicoService.getMedicos().subscribe((res) => {
      this.medicos = res;
    });


  }

}