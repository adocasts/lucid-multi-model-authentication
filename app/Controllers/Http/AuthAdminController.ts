import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthValidator from 'App/Validators/AuthValidator'
import Admin from 'App/Models/Admin'

export default class AuthAdminController {
  public async index({ view }: HttpContextContract) {
    return view.render('auth/admin')
  }

  public async register({ request, response, auth }: HttpContextContract) {
    const data = await request.validate(AuthValidator)
    const admin = await Admin.create(data)

    await auth.use('admin').login(admin)

    return response.redirect('/')
  }

  public async login({ request, response, auth }: HttpContextContract) {
    const { email, password } = await request.validate(AuthValidator)

    await auth.use('admin').attempt(email, password)

    return response.redirect('/')
  }
}
