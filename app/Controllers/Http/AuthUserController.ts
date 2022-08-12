import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthValidator from 'App/Validators/AuthValidator'
import User from 'App/Models/User'

export default class AuthUserController {
  public async index({ view }: HttpContextContract) {
    return view.render('auth/user')
  }

  public async register({ request, response, auth }: HttpContextContract) {
    const data = await request.validate(AuthValidator)
    const user = await User.create(data)

    await auth.login(user)

    return response.redirect('/')
  }

  public async login({ request, response, auth }: HttpContextContract) {
    const { email, password } = await request.validate(AuthValidator)

    await auth.use('user').attempt(email, password)

    return response.redirect('/')
  }
}
