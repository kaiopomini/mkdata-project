import { Request, Response } from 'express'
import knex from '.././database/connection';

class SchedulesController {
  async create(req: Request, res: Response) {

    const { date, time, title, description } = req.body;
    const { userId } = req
    
    if (!(date && time && title)) {
      return res.status(400).json({ errors: ['Preencha todos os campos'] })
    }
    const schedule = {
      title,
      description,
      date,
      time,
      user_id: userId,
      status: 'open'
    }
    try {
      const idCreated = await knex('schedules').insert(schedule);
      
      return res.json({
        id: idCreated[0],
        ...schedule
      })
    } catch (error) {
      
      return res.status(400).json({ errors: ['não foi possivel agendar'] })
    }

  };

  async index(req: Request, res: Response) {
    const { date } = req.query;
    const { userId } = req
    

    if (date) {
      try {
        
        const schedules = await knex('schedules')
          .where('user_id', userId)
          .andWhere('date', String(date))
          .select('*')
          .orderBy('date', 'asc')
          .orderBy('time', 'asc');
        const serializedSchedules = schedules.map(schedule => {
          return {
            id: schedule.id,
            title: schedule.title,
            description: schedule.description,
            date: schedule.date,
            time: schedule.time,
            status: schedule.status,
            user_id: schedule.user_id,
          }
        })
        return res.json(serializedSchedules);
      } catch (error) {
        return res.status(400).json({ errors: ['Não foi possivel encontrar a requisição.'] })
      }
    }
    try {
      const schedules = await knex('schedules')
        .where('user_id', userId)
        .select('*')
        .orderBy('date', 'asc')
        .orderBy('time', 'asc');
      const serializedSchedules = schedules.map(schedule => {
        return {
          id: schedule.id,
          title: schedule.title,
          description: schedule.description,
          date: schedule.date,
          time: schedule.time,
          status: schedule.status,
          user_id: schedule.user_id,
        }
      })
      return res.json(serializedSchedules);
    } catch (error) {
      return res.status(400).json({ errors: ['Não foi possivel encontrar a requisição. 2'] })
    }

  }

  async show(req: Request, res: Response) {
    try {
      const { userId } = req;
      const { id } = req.params;
      const schedule = await knex('schedules').where('id', id).andWhere('user_id', userId).first();

      if (!schedule) {
        return res.status(400).json({ message: 'Agendamento não encontrado' });
      }

      return res.json(schedule);
    } catch (error) {
      return res.status(400).json({ errors: ['Não foi possivel encontrar a requisição. 2'] })
    }

  }

  async update(req: Request, res: Response) {
    try {
    
    const { id } = req.params;
    const { userId } = req
    const { date, time, title, description, status } = req.body;

      const alteredSchedule = {
        status,
        date,
        time,
        title,
        description
      }
      await knex('schedules').where('id', id).andWhere('user_id', userId).update(alteredSchedule);
      return res.json({
        id,
        ...alteredSchedule
      })
    } catch (error) {
      return res.status(400).json({ errors: ['Não foi possivel alterar os dados'] })
    }
  }
  
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { userId } = req;
      await knex('schedules').where('id', id).andWhere('user_id', userId).delete()

      return res.json({ message: 'success' })
    } catch (error) {
      return res.status(400).json({ errors: ['Não foi possivel deletar o agendamento.'] })

    }

  }
}

export default SchedulesController;