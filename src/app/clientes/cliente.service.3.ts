import { Injectable } from '@angular/core';
import { formatDate, DatePipe } from '@angular/common';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

/*
@Injectable({
  providedIn: 'root'
})
*/
@Injectable()
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient, private router: Router) { }

//CRUD

  getClientes(): Observable<Cliente[]> {
    
    //retornar httpclient con cast <Cliente[]>
    //preferida si solo hay que castear y no hay que transformar los datos que llegan
    //return this.http.get<Cliente[]>(this.urlEndPoint);
    
    //con httpclient y transformacion de los datos con map
    return this.http.get(this.urlEndPoint).pipe(
      tap(res => {
        console.log('Tap 1');
        let cli = res as Cliente[];
        cli.forEach(element => {
          console.log(element.nombre);
        });
      }),
      map( response => {
        let clientes = response as Cliente[];
        return clientes.map( clnt => {
          clnt.nombre = clnt.nombre.toUpperCase();
          let datepipe = new DatePipe('es-AR');
          //clnt.createAt = datepipe.transform(clnt.createAt, 'EEEE d, MMMM yyyy');//formatDate(clnt.createAt, 'dd-MM-yyyy', 'en-US');
          return clnt;
        });
      }),
      tap(res => {
        console.log('Tap 2');
        res.forEach(element => {
          console.log(element.nombre);
        });
      })
    )
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        //console.error(e.error.mensaje);
        swal('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  //dejamos el create de una forma y el update de otra como ejemplo, las dos estan correctas.

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
      map( (res: any) => res.cliente as Cliente),
      catchError(e => {
        if(e.status==400){
          return throwError(e);  
        }
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  update(cliente: Cliente): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        if(e.status==400){
          return throwError(e);  
        }
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

}
