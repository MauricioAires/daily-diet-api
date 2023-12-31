/* eslint-disable @typescript-eslint/no-unused-vars */
import knex from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      id: string
      name: string
      email: string
      password: string
      created_at: string
    }

    meals: {
      id: string
      user_id: string
      name: string
      description: string
      meal_at: string
      diet_meal: boolean
      created_at: string
      updated_at: string
    }
  }
}
