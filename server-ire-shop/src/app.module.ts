// Import the necessary modules
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { ProductEntity } from './product/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:"postgres",
      host:'localhost',
      port:5432,
      username:'postgres',
      password:'root',
      database:'postgres',
      entities: [ProductEntity],
      synchronize: true, // Change this to false when in production
    }),
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// Add a console log statement to print the value of process.env.DB_TYPE
//console.log("DB_TYPE:", process.env.DB_TYPE);
