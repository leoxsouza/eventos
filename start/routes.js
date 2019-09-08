'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store').validator('User')
Route.post('sessions', 'SessionController.store').validator('Session')

Route.group(() => {
  Route.put('users', 'UserController.update').validator('ChangePassword')

  Route.post('eventos', 'EventoController.store').validator('Evento')
  Route.get('eventos', 'EventoController.index')
  Route.delete('eventos/:id', 'EventoController.destroy')

  Route.post('compartilhar-evento/:id', 'CompartilharEventoController.store')
}).middleware(['auth'])
