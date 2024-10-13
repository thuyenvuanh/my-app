import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Controller('expense')
export class ExpenseController {
  private logger = new Logger(ExpenseController.name);
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

  @Get()
  findAll() {
    this.logger.log('Entering findAll()');
    return this.expenseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: any) {
    this.logger.log('Entering findOne()');
    return this.expenseService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: any, @Body() updateExpenseDto: UpdateExpenseDto) {
    this.logger.log('Entering update()');
    return this.expenseService.update(id, updateExpenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: any) {
    this.logger.log('Entering delete()');
    return this.expenseService.remove(id);
  }
}
