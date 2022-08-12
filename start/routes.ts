/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})

Route.get('/auth/user', 'AuthUserController.index').as('auth.user.index')
Route.post('/auth/user/register', 'AuthUserController.register').as('auth.user.register')
Route.post('/auth/user/login', 'AuthUserController.login').as('auth.user.login')

Route.get('/auth/admin', 'AuthAdminController.index').as('auth.admin.index')
Route.post('/auth/admin/register', 'AuthAdminController.register').as('auth.admin.register')
Route.post('/auth/admin/login', 'AuthAdminController.login').as('auth.admin.login')

Route.get('/auth/logout', async ({ response, auth }) => {
  await auth.logout()

  return response.redirect('/')
}).as('auth.logout')
