import {Request, Response} from 'express'
import knex from '.././database/connection';

class SchedulesController {
  async create(req: Request, res: Response){
   
    const { date, time, title, description, user_id } = req.body;
    const schedule = {
      title,
      description, 
      date,
      time,
      user_id, 
      status: 'open'
    }
    const idCreated = await knex('schedules').insert(schedule);
    return res.json({
      id: idCreated[0],
      ...schedule
    })
  };

  async index(req: Request, res: Response){
    const { date } = req.query;
    const schedules = await knex('schedules')
      .where('date', String(date))
      .select('*')
      .orderBy('time');
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
  }

  async show(req: Request, res: Response){
    const { id } = req.params;
    const schedule = await knex('schedules').where('id', id).first();

    if (!schedule) {
      return res.status(400).json({ message: 'Schedule not found'});
    }

    return res.json(schedule);
  }

  async update(req: Request, res: Response){
    const { id } = req.params;
    const { date, time, title, description, status} = req.body;
    const alteredSchedule = {
      status, 
      date, 
      time, 
      title, 
      description 
    }
    await knex('schedules').where('id', id).update(alteredSchedule);
    return res.json({
      id,
      ...alteredSchedule
    })

  }
  async delete(req: Request, res: Response){
    const { id } = req.params;
    await knex('schedules').where('id', id).delete()

    return res.json({message: 'success'})
  }
}

export default SchedulesController;