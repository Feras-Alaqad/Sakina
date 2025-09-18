import { DataTypes } from 'sequelize';
import { AppointmentsAttributes } from '../types';
import sequelize from '../db/connection';
import Therapist from './therapist';

const Appointment = sequelize.define<AppointmentsAttributes>('appointment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  therapistId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'therapists',
      key: 'id',
    },
  },
  datetime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  isBooked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

// Define associations
Appointment.belongsTo(Therapist, {
  foreignKey: 'therapistId',
  as: 'therapist',
});

export default Appointment;
