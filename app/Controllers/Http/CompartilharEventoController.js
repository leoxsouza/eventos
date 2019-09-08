'use strict'

const Kue = use('Kue')
const Job = use('App/Jobs/CompartilharEventoMail')
const Evento = use('App/Models/Evento')

class CompartilharEventoController {
  async store ({ params, request, response, auth }) {
    const email = request.only(['email'])
    const evento = await Evento.findOrFail(params.id)

    Kue.dispatch(Job.key, { email, username: auth.user.name, evento }, { attempts: 3 })

    return email
  }
}

module.exports = CompartilharEventoController
