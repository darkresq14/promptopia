import { Schema, model, models } from 'mongoose';
import { IUser } from './user';

export interface IPrompt {
  _id?: string;
  creator: IUser;
  prompt: string;
  tag: string;
}

const PromptSchema = new Schema<IPrompt>({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  prompt: {
    type: String,
    required: [true, 'Prompt is required.'],
  },
  tag: {
    type: String,
    required: [true, 'Tag is required.'],
  },
});

const Prompt = models.Prompt || model<IPrompt>('Prompt', PromptSchema);

export default Prompt;
