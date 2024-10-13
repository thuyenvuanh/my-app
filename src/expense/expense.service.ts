import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Expense } from './schemas/expense.schema';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class ExpenseService {
  private readonly logger = new Logger(ExpenseService.name);

  constructor(
    @InjectModel(Expense.name) private expenseModel: Model<Expense>,
  ) {}

  async create(createExpenseDto: CreateExpenseDto) {
    let entity = {
      ...createExpenseDto,
    };
    try {
      this.logger.debug(
        `Creating new expense with properties: ${Object.keys(entity).join(', ')}`,
      );
      return this.expenseModel.create(entity);
    } catch (error) {
      this.logger.error(error);
      throw new Error(`Failed to save expense `);
    }
  }

  async findAll() {
    return await this.expenseModel.find().exec();
  }

  async findOne(id: ObjectId) {
    let result = await this.expenseModel.findById(id).exec();
    this.logger.log(result);
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  async update(id: ObjectId, updateExpenseDto: UpdateExpenseDto) {
    let isExisted = await this.expenseModel.findById(id).exec();
    if (!isExisted) {
      throw new NotFoundException();
    }
    let updateEntity = {
      isExisted,
      ...updateExpenseDto,
    };
    return await this.expenseModel.findByIdAndUpdate(id, updateEntity);
  }

  async remove(id: ObjectId) {
    try {
      return await this.expenseModel.findOneAndDelete(id);
    } catch (error) {
      this.logger.error(`Failed to delete expense with Id ${id}`);
      this.logger.error(error);
    }
  }
}
