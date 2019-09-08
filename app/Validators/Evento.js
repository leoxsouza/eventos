'use strict'

class Evento {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      title: 'required',
      location: 'required',
      date: 'required|date'
    }
  }
}

module.exports = Evento
