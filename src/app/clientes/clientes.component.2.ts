import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service.2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];

  constructor( private clienteService: ClienteService) { }

  ngOnInit() { 
    this.clienteService.getClientes().subscribe(
        x => this.clientes = x
    );
  }

}