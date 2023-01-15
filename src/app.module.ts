import { Module, Post, Request, UseGuards } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthGuard } from '@nestjs/passport/dist';

@Module({
	imports: [AuthModule, UsersModule],
	controllers: [AppController],
	providers: [],
})
export class AppModule { 
	
}
