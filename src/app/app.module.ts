import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ExpenseModule } from '../expense/expense.module';
import { AuthMiddleWare } from '../middleware/auth.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ExpenseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        let host = configService.get<string>('MONGODB_HOST');
        let username = configService.get<string>('MONGODB_USERNAME');
        let password = configService.get<string>('MONGODB_PASSWORD');
        let database = configService.get<string>('MONGODB_DATABASE');
        return {
          uri: `mongodb+srv://${username}:${password}@${host}/${database}`,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleWare)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
