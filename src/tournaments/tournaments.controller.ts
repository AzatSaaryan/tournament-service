import { Controller, Post, Get, Param, Patch, Body } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';

@Controller('tournaments')
export class TournamentsController {
  constructor(private readonly tournamentsService: TournamentsService) {}

  @Post()
  async createTournament(@Body() body: { name: string }) {
    return await this.tournamentsService.createTournament(body.name);
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
