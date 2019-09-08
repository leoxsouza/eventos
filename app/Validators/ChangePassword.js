'use strict'

class ChangePassword {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      oldPassword: 'required',
      newPassword: 'required|confirmed'
    }
  }
}

module.exports = ChangePassword
