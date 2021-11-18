import { Injectable } from '@angular/core';
import { formatDate, DatePipe } from '@angular/common';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
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

  getClientes(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap((res: any) => {
        console.log('Tap 1');
        (res.content as Cliente[]).forEach(element => {
          console.log(element.nombre);
        });
      }),
      map( (res: any) => {
        (res.content as Cliente[]).map( clnt => {
          clnt.nombre = clnt.nombre.toUpperCase();
          return clnt;
        });
        return res;
      }),
      tap(res => {
        console.log('Tap 2');
        (res.content as Cliente[]).forEach(element => {
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

  //sin la barra de progreso
  //subirFoto(archivo: File, id): Observable<Cliente>{
  subirFoto(archivo: File, id): Observable<HttpEvent<{}>>{
    //tenemos que enviar utilizando FormData con soporte multipart/form-data (enctype)
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    //sin la barra de progreso
    /*
    return this.http.post(`${this.urlEndPoint}/upload`, formData).pipe(
      map( (response: any) => response.cliente as Cliente ),
      catchError(e => {
        console.error(e.error.mensaje);
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
    */
    //con barra de progreso
    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true
    });
    return this.http.request(req);
  }

}
