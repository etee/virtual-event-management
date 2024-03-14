import Joi from "joi";

export interface User {
  id: string;
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  role?: string;
  dob?: string;
  gender?: string;
}

const userSchema = Joi.object({
  fullName: Joi.string()
    .min(3)
    .max(30)
    .required()
    .regex(/^[a-zA-Z]+(\s[a-zA-Z]+)?$/),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(6)
    .max(30)
    .required()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/),
  phoneNumber: Joi.string()
    .min(10)
    .max(15)
    .required()
    .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/),
  role: Joi.string()
    .valid("regular", "organizer", "moderator", "speaker")
    .optional(),
});

export default userSchema;
