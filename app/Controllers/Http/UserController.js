'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')

class UserController {
  async store ({ request }) {
    const data = request.only(['name', 'email', 'password'])

    const user = await User.create(data)

    return user
  }

  async update ({ request, auth }) {
    const data = request.only(['name', 'oldPassword', 'newPassword'])

    const user = await User.find(auth.user.id)

    const verifyPassword = await Hash.verify(
      data.oldPassword,
      user.password
    )

    if (verifyPassword) {
      user.name = data.name
      user.password = data.newPassword
      await user.save()
    }

    return user
  }
}

module.exports = UserController
