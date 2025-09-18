import { Op } from 'sequelize';
import { Appointment } from '../models';
import { templateErrors } from '../helpers';

export const getAppointmentsPerDateService = async (
  therapistId: string,
  date: string,
) => {
  try {
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    const appointments = await Appointment.findAll({
      where: {
        therapistId,
        datetime: {
          [Op.between]: [startDate, endDate],
        },
      },
      order: [['datetime', 'ASC']],
    });

    return appointments;
  } catch (error) {
    throw templateErrors.INTERNAL_SERVER_ERROR('Error retrieving appointments');
  }
};

export const getAppointmentById = async (id: string) => {
  try {
    const appointment = await Appointment.findByPk(id);
    return appointment;
  } catch (error) {
    throw templateErrors.INTERNAL_SERVER_ERROR('Error retrieving appointment');
  }
};

export const updateIsAvailable = async (id: string, isAvailable: boolean) => {
  try {
    await Appointment.update(
      { isAvailable: !isAvailable },
      {
        where: {
          id,
        },
      },
    );
    return true;
  } catch (error) {
    throw templateErrors.INTERNAL_SERVER_ERROR('Error updating appointment');
  }
};

export const addAppointment = async (
  therapistId: number,
  from: string,
  to: string,
  time: number,
) => {
  try {
    const startDate = new Date(from);
    const endDate = new Date(to);
    
    // Calculate the number of days between start and end dates
    const dayDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (dayDiff <= 0) {
      return [];
    }

    const appointments = [];
    
    // Create appointments for each day in the range
    for (let i = 0; i <= dayDiff; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      // Set the appointment time
      currentDate.setHours(time, 0, 0, 0);
      
      // Create the appointment
      const appointment = await Appointment.create({
        therapistId,
        datetime: currentDate,
        isBooked: false,
        isAvailable: true,
      });
      
      appointments.push(appointment);
    }
    
    return appointments;
  } catch (error) {
    throw templateErrors.INTERNAL_SERVER_ERROR('Error creating appointments');
  }
};