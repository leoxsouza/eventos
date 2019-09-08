'use strict'

const Mail = use('Mail')

class CompartilharEventoMail {
  static get concurrency () {
    return 1
  }

  static get key () {
    return 'CompartilharEventoMail-job'
  }

  async handle ({ email, username, evento }) {
    console.log(`Job: ${CompartilharEventoMail.key}`)

    console.log(email)
    console.log(username)

    await Mail.send(
      ['emails.compartilhar_evento'],
      { username, evento },
      message => {
        message
          .to(email.email)
          .from('leoxsouza286@gmail.com', 'Leo')
          .subject(`Evento: ${evento.title}`)
      }
    )
  }
}

module.exports = CompartilharEventoMail
