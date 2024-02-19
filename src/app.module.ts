import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as process from 'node:process';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        AuthModule,
        UsersModule,
        MongooseModule.forRoot(
            `mongodb://${process.env.MONGO_USERNAME}:
            ${process.env.MONGO_PASSWORD}@
            ${process.env.MONGO_HOST}:
            ${process.env.MONGO_PORT}/
            ${process.env.MONGO_DATABASE}
            `.replace(/\s+/gm, '')
        )
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
