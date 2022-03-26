import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'

export default class CategoriesController {
  public async index({ view }: HttpContextContract) {
    const categories = await Category.all()

    return view.render('backend/category/index', { categories })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('backend/category/add')
  }

  public async store(ctx: HttpContextContract) {
    const { name } = ctx.request.body()

    if (!name) {
      return ctx.response.status(422).send('category name is required !')
    }

    await Category.create({ name })

    ctx.response.redirect().toPath('/categories')
  }

  public async edit(ctx: HttpContextContract) {
    const id = ctx.request.param('id')
    const category = await Category.findOrFail(id)
    const categoryJson = await category.toJSON()

    return ctx.view.render('backend/category/edit', categoryJson)
  }

  public async update(ctx: HttpContextContract) {
    const id = ctx.request.param('id')
    const { name } = ctx.request.body()

    if (!name) {
      return ctx.response.status(422).send('category name is required !')
    }

    const category = await Category.findOrFail(id)
    category.name = name

    await category.save()

    ctx.response.redirect().toPath('/categories')
  }

  public async delete(ctx: HttpContextContract) {
    const id = ctx.request.param('id')

    if (!id) {
      return ctx.response.status(400).send('Category id is required')
    }

    const category = await Category.findOrFail(id)
    await category.delete()

    ctx.response.redirect().toPath('/categories')
  }
}
