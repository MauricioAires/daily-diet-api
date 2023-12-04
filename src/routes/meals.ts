import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { knex } from '../database/connection'
import { ensureAuthenticated } from '../middlewares/ensure-authenticated'
import { Knex } from 'knex'

export async function mealsRoutes(app: FastifyInstance) {
  /**
   * hook de contexto
   */
  app.addHook('preHandler', ensureAuthenticated)

  app.get('/', async (req, res) => {
    const userId = req.user?.id

    const meals = await knex('meals').where({
      user_id: userId,
    })

    return res.send({
      meals,
    })
  })

  app.get('/metrics', async (req) => {
    const userId = req.user?.id

    const data = await knex('meals')
      .select()
      .count('meals.id', {
        as: 'total',
      })

      // Buscar apenas os meals que não estão na dieta
      .with('meals_not_diet_meal', (qb) => {
        qb.select('id').from('meals').where({
          user_id: userId,
          diet_meal: false,
        })
      })
      .leftJoin('meals_not_diet_meal', 'meals_not_diet_meal.id', 'meals.id')
      .count('meals_not_diet_meal.id', {
        as: 'not_diet_meal',
      })

      // Buscar apenas os meals que estão na dieta
      .with('meals_diet_meal', (qb) => {
        qb.select('id').from('meals').where({
          user_id: userId,
          diet_meal: true,
        })
      })
      .leftJoin('meals_diet_meal', 'meals_diet_meal.id', 'meals.id')
      .count('meals_diet_meal.id', {
        as: 'diet_meal',
      })

      // Buscar a melhor sequência de refeições dentro da dieta
      .with('best_sequence', (qb: Knex.QueryBuilder) => {
        qb.count('*', {
          as: 'count',
        })
          .from((qb: Knex.QueryBuilder) => {
            qb.select('id', 'diet_meal')
              .rowNumber('best_sequence', function () {
                this.orderBy('id').partitionBy('diet_meal')
              })
              .from('meals')
              .as('t')
              .where({
                user_id: userId,
                diet_meal: true,
              })
          })
          .groupBy('diet_meal')
          .groupByRaw('(id - best_sequence)')
          .orderBy('diet_meal')
          .orderByRaw('count(*) desc')
          .limit(1)
      })
      .join('best_sequence', knex.raw('1 = 1'))
      .select('best_sequence.count as best_sequence')
      .groupBy('best_sequence.count')

      .where({
        user_id: userId,
      })
      .first()

    return {
      status: 'success',
      data,
    }
  })
  app.post('/', async (req, res) => {
    const createMealSchema = z.object({
      name: z.string(),
      description: z.string(),
      mealAt: z.coerce.date(),
      dietMeal: z.boolean(),
    })

    const userId = req.user?.id

    const { name, description, mealAt, dietMeal } = createMealSchema.parse(
      req.body,
    )

    await knex('meals').insert({
      id: randomUUID(),
      user_id: userId,
      name,
      description,
      meal_at: mealAt.toISOString(),
      diet_meal: dietMeal,
    })

    return res.status(204).send()
  })
  app.put('/:id', async (req, res) => {
    const updateMealSchema = z.object({
      name: z.string(),
      description: z.string(),
      mealAt: z.coerce.date(),
      dietMeal: z.boolean(),
    })

    const { id: mealId } = z
      .object({
        id: z.string(),
      })
      .parse(req.params)

    const userId = req.user?.id

    const { name, description, mealAt, dietMeal } = updateMealSchema.parse(
      req.body,
    )

    await knex('meals')
      .update({
        id: randomUUID(),
        user_id: userId,
        name,
        description,
        meal_at: mealAt.toISOString(),
        diet_meal: dietMeal,
        updated_at: new Date().toISOString(),
      })
      .where({
        id: mealId,
        user_id: userId,
      })

    return res.status(204).send()
  })
  app.delete('/:id', async (req, res) => {
    const { id: mealId } = z
      .object({
        id: z.string(),
      })
      .parse(req.params)

    const userId = req.user?.id

    await knex('meals').delete().where({
      id: mealId,
      user_id: userId,
    })

    return res.status(204).send()
  })
}
