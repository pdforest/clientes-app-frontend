import { Cliente } from './cliente';

export const CLIENTES: Cliente[] = [
    {id: 1, nombre: 'Pepe', apellido: 'Argento', createAt: '2020-06-22', email: 'pepe@gmail.com', foto: '', region: {id: 1, nombre: 'Sudamerica'} },
    {id: 2, nombre: 'Nico', apellido: 'Gomez', createAt: '2020-06-10', email: 'nico@gmail.com', foto: '', region: {id: 2, nombre: 'Norteamerica'}},
    {id: 3, nombre: 'Tito', apellido: 'Esperanza', createAt: '2020-05-02', email: 'tito@gmail.com', foto: '', region: {id: 1, nombre: 'Sudamerica'}},
    {id: 4, nombre: 'Cacho', apellido: 'Castaña', createAt: '2020-04-11', email: 'cacho@gmail.com', foto: '', region: {id: 3, nombre: 'Centroamerica'}},
    {id: 5, nombre: 'Rulo', apellido: 'Martinez', createAt: '2020-01-07', email: 'rulo@gmail.com', foto: '', region: {id: 4, nombre: 'Africa'}}
  ]
