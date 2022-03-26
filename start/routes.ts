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

Route.group(() => {
  Route.get('/', 'Backend/Category/CategoriesController.index')
  Route.get('/create', 'Backend/Category/CategoriesController.create')
  Route.post('/store', 'Backend/Category/CategoriesController.store')
  Route.get('/:id/edit', 'Backend/Category/CategoriesController.edit')
  Route.post('/:id/update', 'Backend/Category/CategoriesController.update')
  Route.get('/:id/delete', 'Backend/Category/CategoriesController.delete')
}).prefix('/categories')
