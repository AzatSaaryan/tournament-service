import { Module } from '@nestjs/common';
import { MatchsService } from './matches.service';
import { MatchsController } from './matches.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MatchsController],
  providers: [MatchsService],
})
export class MatchsModule {}
