import { Controller, Post, Get, Param, Patch } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';

@Controller('tournaments')
export class TournamentsController {
  constructor(private readonly tournamentsService: TournamentsService) {}

  @Post(':name')
  async createTournament(@Param('name') name: string) {
    return await this.tournamentsService.createTournament(name);
  }

  @Patch(':id/start')
  async startTournament(@Param('id') id: string) {
    return await this.tournamentsService.startTournament(id);
  }

  @Patch(':id/finish')
  async finishTournament(@Param('id') id: string) {
    return await this.tournamentsService.finishTournament(id);
  }

  @Get(':id/matches')
  async getTournamentMatches(@Param('id') id: string) {
    return await this.tournamentsService.getTournamentMatches(id);
  }
}
