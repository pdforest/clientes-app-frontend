import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente;
  public titulo: String = "Crear Cliente";
  public errores: string[];

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit() {
    this.cargarCliente()
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.clienteService.getCliente(id).subscribe( cliente => this.cliente = cliente )
      }
    })
  }

  public create(): void {
    this.clienteService.create(this.cliente).subscribe(
      res => {
        this.router.navigate(['/clientes'])
        swal('Cliente Creado', `El cliente ${res.nombre} se creo con exito`, 'success')
      },    
      err => {
        this.errores = err.error.errors as string[];
        //console.error('Codigo de error desde el backend: ' + err.status);
        //console.error(err.error.errors);
      }
    )
  }

  public update(): void {
    this.clienteService.update(this.cliente).subscribe(
      res => {
        this.router.navigate(['/clientes'])
        swal('Cliente Actualizado', `${res.mensaje}`, 'success')
      },
      err => {
        this.errores = err.error.errors as string[];
        //console.error('Codigo de error desde el backend: ' + err.status);
        //console.error(err.error.errors);
      }
    )
  }

  public cancel($event: any): void {
    $event.preventDefault();
    this.router.navigate(['/clientes']);
  }

}
