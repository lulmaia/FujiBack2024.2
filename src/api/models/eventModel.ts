import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
  name: string;
  date: string;
  location: string;
  description: string;
}

const EventSchema: Schema = new Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
});

export const Event = mongoose.model<IEvent>('Event', EventSchema);
