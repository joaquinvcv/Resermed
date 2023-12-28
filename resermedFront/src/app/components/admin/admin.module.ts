import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AdminComponent } from './components/admin/admin.component';
import { MedicosComponent } from './components/medicos/medicos.component';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { AppRoutingModule } from "src/app/app-routing.module";
import { NuevoDoctorComponent } from './components/medicos/nuevo-doctor/nuevo-doctor.component';
import { MedLibrePipe } from "src/app/pipes/med-libre.pipe";
import { NgxPaginationModule } from "ngx-pagination";
import { FormsModule } from "@angular/forms";
import { DatosCitasComponent } from "./components/pacientes/datos-citas/datos-citas.component";
import { RutFormatPipe } from "src/app/pipes/rut-format.pipe";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { CitaTomadaPipe } from "src/app/pipes/cita-tomada.pipe";
import { TimeFormatPipe } from "src/app/pipes/time-format.pipe";




@NgModule({
    declarations: [
        AdminComponent,
        MedicosComponent,
        PacientesComponent,
        NuevoDoctorComponent,
        MedLibrePipe,
        DatosCitasComponent,
        RutFormatPipe,
        CitaTomadaPipe,
        
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      NgxPaginationModule,
      FormsModule,
      NgxMaskDirective, NgxMaskPipe,
    ],
    exports: [AdminComponent],
    providers: [provideNgxMask()],
    bootstrap: [AdminComponent]
  })
export class AdminModule{}