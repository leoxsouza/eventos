'use strict'

const Evento = use('App/Models/Evento')
const moment = require('moment')

class EventoController {
  async index ({ request }) {
    const { date, page } = request.get()

    let query = Evento.query().with('user')

    if (date) {
      query = query.whereRaw('"date"::date = ?', date)
    }

    const eventos = await query.paginate(page)

    return eventos
  }

  async store ({ request, response, auth }) {
    const data = request.only(['title', 'location', 'date'])
    data.user_id = auth.user.id

    const eventoSalvo = await Evento.findBy('date', data.date)

    if (eventoSalvo) {
      return response.status(401).send({
        error: {
          message: 'Não é possível definir dois eventos no mesmo horário.'
        }
      })
    }

    const evento = await Evento.create(data)
    return evento
  }

  async show ({ params }) {
  }

  async update ({ params, request, response }) {
  }

  async destroy ({ params, response, auth }) {
    const { id } = params
    const evento = await Evento.find(id)

    if (evento.user_id !== auth.user.id) {
      return response.status(401).send({
        error: {
          message: 'Você só pode excluir seus próprios eventos.'
        }
      })
    }

    const passed = moment().isAfter(evento.date)

    if (passed) {
      return response.status(401).send({
        error: {
          message: 'Não é possível excluir um evento que já passou.'
        }
      })
    }

    await evento.delete()
  }
}

module.exports = EventoController
