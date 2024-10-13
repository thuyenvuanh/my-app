import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now } from 'mongoose';

export type ExpenseDocument = HydratedDocument<Expense>;

@Schema()
export class Expense {
  @Prop({
    required: true,
  })
  amount: number;

  @Prop()
  description: string;

  @Prop({
    default: now(),
  })
  payAt: Date;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
