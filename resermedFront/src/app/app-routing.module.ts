import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ReservarComponent } from './components/reservar/reservar.component';
import { CitasComponent } from './components/citas/citas.component';
import { RegistroComponent } from './components/registro/registro.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { AdminComponent } from './components/admin/components/admin/admin.component';
import { MedicosComponent } from './components/admin/components/medicos/medicos.component';
import { PacientesComponent } from './components/admin/components/pacientes/pacientes.component';
import { ResultadosComponent } from './components/resultados/resultados.component';
import { SetHorarioComponent } from './components/set-horario/set-horario.component';
import { MedicoGuard } from './guards/medico-guard.guard';
import { SharedGuard } from './guards/shared.guard';
import { UserGuard } from './guards/user-guard.guard';
import { MantenedorGuard } from './guards/mantenedor.guard';
import { AuthGuard } from './guards/auth.guard';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { PreguntasFrecuentesComponent } from './components/preguntas-frecuentes/preguntas-frecuentes.component';
import { PerfilComponent } from './components/perfil/perfil.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, title: 'Home - ReserMed'},
  { path: 'resultados', component: ResultadosComponent, title: 'Resultados - ReserMed'},
  { path:'login',component: LoginComponent, title: 'Login - ReserMed'},
  { path:'nosotros',component:NosotrosComponent, title: 'Quiénes somos - ReserMed'},
  { path:'admin',component:AdminComponent, title: 'Panel de mantenedor - ReserMed' , children:[
    {path:'medicos',component: MedicosComponent},
    {path: 'pacientes', component: PacientesComponent}
  ], canActivate: [MantenedorGuard, AuthGuard]},
  { path: 'reservar/:id', component: ReservarComponent, title: 'Reservar cita - ReserMed' ,canActivate: [UserGuard, AuthGuard]},
  { path: 'citas', component: CitasComponent, title: 'Mis citas - ReserMed',canActivate: [SharedGuard, AuthGuard]},
  { path: 'registro', component: RegistroComponent, title: 'Registro - ReserMed'},
  { path: 'calendario', component: CalendarioComponent, title: 'Calendario - ReserMed',canActivate: [SharedGuard, AuthGuard]},
  { path: 'nuevo-horario', component: SetHorarioComponent, title: 'Definir horario - ReserMed',canActivate: [MedicoGuard, AuthGuard]},
  { path: 'preguntas-frecuentes', component: PreguntasFrecuentesComponent, title: 'Preguntas frecuentes - ReserMed' },
  { path: 'perfil', component: PerfilComponent, title: 'Mi perfil - Resermed', canActivate: [AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]

})
export class AppRoutingModule { }
