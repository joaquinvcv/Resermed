import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IMantenedor, IMedico, IUsuario } from 'src/app/interfaces/interfaces';
import { CitasService } from 'src/app/services/citas.Service';
import { LoginService } from 'src/app/services/login/login.service';
import { MantenedorService } from 'src/app/services/mantenedor.service';
import { MedicoService } from 'src/app/services/medico.service';
import { CloudinaryService } from 'src/app/services/subir-imgs/cloudinary.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  userType: string = '';
  addUser: FormGroup;
  id: number = 0;
  medico!: IMedico;
  usuario!: IUsuario;
  mantenedor!: IMantenedor;
  edicion: boolean = false;

  img_url: string = "";
  widget:any;

  constructor(
    private userS: UsuarioService,
    private medS: MedicoService,
    private mantS: MantenedorService,
    private citaS: CitasService,
    private loginS: LoginService,
    private cloudinary: CloudinaryService,
    private toastr: ToastrService
  ) { 
    this.addUser = new FormGroup({

      telefono: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      direccion: new FormControl(''),
      
    });
  }

  ngOnInit(): void {
    this.cloudinary.createUploadWidget(
      {
        cloudName: 'CLOUD_NAME',
        uploadPreset: 'resermed',
        clientAllowedFormats: ["jpg", "png", "jpeg"]
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          this.img_url = result.info.secure_url;
        }
      }
    ).subscribe(widget => this.widget = widget);


    let user = localStorage.getItem("currentUser");

    if (user) {
      const tokenData = JSON.parse(user);
      this.userType = tokenData.userType;
      this.id = tokenData.id;
    }

    switch (this.userType) {
      case 'usuario':
        this.userS.getUsuarioById(this.id).subscribe((res) => {
          this.usuario = res;
          this.addUser.controls['telefono'].setValue(this.usuario.telefono);
          this.addUser.controls['email'].setValue(this.usuario.email);

        });
        break;
      case 'medico':
        this.medS.getMedicoById(this.id).subscribe((res) => {
          this.medico = res;
          this.addUser.controls['telefono'].setValue(this.medico.telefono);
          this.addUser.controls['email'].setValue(this.medico.email);
          let direccionControl = this.addUser.get('direccion');
          direccionControl?.setValidators([Validators.required]);
          this.addUser.controls['direccion'].setValue(this.medico.direccion);
          direccionControl?.updateValueAndValidity();


        });
        break;
      case 'mantenedor':
        this.mantS.getMantenedorById(this.id).subscribe((res) => {
          this.mantenedor = res;
          this.addUser.controls['telefono'].setValue(this.mantenedor.telefono);
          this.addUser.controls['email'].setValue(this.mantenedor.email);
        });
        break;
    }
  }

  toggleEdit(){
    if(this.edicion){
      this.edicion = false;
    }else{
      this.edicion = true;
    }

  }

  toggleDelete(){
    // if(this.edicion === 'eliminar'){
    //   this.edicion = 'vista';
    // }else{
    //   this.edicion = 'eliminar';
    // }

  }

  editarPerfil(){
    switch (this.userType) {
      case 'usuario':
        this.usuario.telefono = this.addUser.get('telefono')?.value;
        this.usuario.email = this.addUser.get('email')?.value;
        this.usuario.password = this.addUser.get('password')?.value;
        if(this.img_url != ''){
          this.usuario.img_url = this.img_url;
        }

        this.userS.updateUsuario(this.usuario, this.id).subscribe((res)=>{
          this.showSuccess();
          this.edicion = false;

        },
        (err)=>{
          this.showWarning();
          this.edicion = false;

        })

        break;
      case 'medico':
        this.medico.telefono = this.addUser.get('telefono')?.value;
        this.medico.email = this.addUser.get('email')?.value;
        this.medico.password = this.addUser.get('password')?.value;
        this.medico.direccion = this.addUser.get('direccion')?.value;

        if(this.img_url != ''){
          this.medico.img_url = this.img_url;
        }

        this.medS.updateMedico(this.medico, this.id).subscribe((res)=>{
          this.showSuccess();
          this.edicion = false;

        },
        (err)=>{
          this.showWarning();
          this.edicion = false;

        })

        break;
      case 'mantenedor':
        this.mantenedor.telefono = this.addUser.get('telefono')?.value;
        this.mantenedor.email = this.addUser.get('email')?.value;
        this.mantenedor.password = this.addUser.get('password')?.value;
        if(this.img_url != ''){
          this.mantenedor.img_url = this.img_url;
        }

        this.mantS.updateMantenedor(this.mantenedor, this.id).subscribe((res)=>{
          this.showSuccess();
          this.edicion = false;

        },
        (err)=>{
          this.showWarning();
          console.log(err);
          
          this.edicion = false;

        })

        break;
    }

  }

  eliminar(){
    Swal.fire({
      title: "¿Estás seguro(a)?",
      text: "Esta acción no se puede revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar cuenta",
      confirmButtonColor: "#DC3545",
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#6C757D"
    }).then((res)=>{
      if(res.value){

        switch(this.userType){
          case 'usuario':
            this.citaS.freeCitas({userType: this.userType, userId: this.id}).subscribe((res)=>{
              
              this.userS.deleteUsuario(this.id).subscribe((res)=>{

                this.loginS.logout();
                
              });
            })

            break;

          case 'medico':
            this.citaS.freeCitas({userType: this.userType, userId: this.id}).subscribe((res)=>{
                      
              this.medS.deleteMedico(this.id).subscribe((res)=>{

                this.loginS.logout();
                
              })
            })

            break;

          case 'mantenedor':
            this.mantS.deleteMantenedor(this.id).subscribe((res)=>{

              this.loginS.logout();
            })

            break;
        }


      }
    })

  }


  openWidget() {
    if (this.widget) {
      this.widget.open();
    }
  }

  showSuccess(){
    this.toastr.success('Éxito', 'Perfil actualizado');
  }



  showWarning(){
    this.toastr.warning('Hubo un problema', 'No se pudo actualizar perfil');
  }

}
