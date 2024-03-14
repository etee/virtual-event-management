import BaseJoi from 'joi';
import JoiDate from '@joi/date';
import userSchema, { User } from './user.model';

const Joi = BaseJoi.extend(JoiDate);

export interface Event {
    id: string;
    name: string;
    category: string;
    description: string;
    dateTime: Date;
    duration: string;
    link: string;
    speaker?: User;
    imageUrl?: string;
    capacity: number;
    targetAudience?: string; 
    participants?: User[];
    reviews?: Review[];
}

export interface Review {
    id: string;
    userId: string;
    rating: number;
    review: string;
}

export interface Participant {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
}

const eventSchema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    category : Joi.string().min(5).max(20).required(),
    description: Joi.string().required(),
    dateTime: Joi.date().format('YYYY-MM-DD HH:mm').required(),
    duration: Joi.string().required().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
    link: Joi.string().required(),
    speaker: userSchema,
    capacity: Joi.number(),
    imageUrl: Joi.string()
});

export default eventSchema;