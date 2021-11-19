import { Component, Input, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { HttpEventType} from '@angular/common/http';
import { ModalService } from './modal.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  //cliente: Cliente;
  @Input() cliente: Cliente;
  titulo: String = "Detalle del cliente";
  private fotoSeleccionada: File;
  public errores: string[];
  progreso: number = 0;
  private urlBackend = environment.urlBackend;

  /*
  * Inyectamos por constructor el ClienteService y el ActivatedRoute que lo necesitamos
  * para editar un cliente y poder subscribirnos para ver cuando cambia el parametro del id
  */
  constructor(
    private clienteService: ClienteService,
    //private activatedRoute: ActivatedRoute,
    public modalService: ModalService
  ){}

  ngOnInit() {
    //ya no se necesita porque inyectamos el cliente por Imput()
    /*
    this.activatedRoute.paramMap.subscribe( params => {
      //el + convierte a number
      let id:number = +params.get('id');
      if(id){
        this.clienteService.getCliente(id).subscribe(cliente => {
          this.cliente = cliente;
        })
      }
    })
    */
  }

  seleccionarFoto(event){
    this.progreso = 0;
    this.fotoSeleccionada =event.target.files[0];
    if(this.fotoSeleccionada.type.indexOf('image') < 0 ){
      swal('Error Tipo', 'Debe seleccionar una imagen', 'error');
      this.fotoSeleccionada = null;
    }

  }

  subirFoto(){
    if(!this.fotoSeleccionada){
      swal('Error Upload', 'Debe seleccionar una foto', 'error');
    }else {
      this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id)
      .subscribe(event => {

        if(event.type === HttpEventType.UploadProgress){
          this.progreso = Math.round(100 * event.loaded / event.total);
        }else if(event.type === HttpEventType.Response){
          let response: any = event.body;
          this.cliente = response.cliente as Cliente;

          this.modalService.notificarUpload.emit(this.cliente);

          swal('La foto se subio correctamente!', response.mensaje, 'success');
        }
        //this.cliente = cliente;
        //swal('La foto se subio correctamente!', `La foto ${this.cliente.foto} se subió con exito`, 'success');
        },    
        err => {
          this.errores = err.error.errors as string[];
          //console.error('Codigo de error desde el backend: ' + err.status);
          //console.error(err.error.errors);
        }
      );
    }
    
  }

  cerrarModal(){
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }

}
