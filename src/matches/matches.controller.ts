import { Controller, Post, Patch, Get, Body, Param } from '@nestjs/common';
import { MatchsService } from './matches.service';

@Controller('matches')
export class MatchsController {
  constructor(private readonly matchsService: MatchsService) {}

  @Post()
  async createMatch(
    @Body()
    dto: {
      tournamentId: string;
      player1Id: string;
      player2Id: string;
    },
  ) {
    return this.matchsService.createMatch(
      dto.tournamentId,
      dto.player1Id,
      dto.player2Id,
    );
  }

  @Patch(':id/run')
  async runMatch(@Param('id') matchId: string) {
    return this.matchsService.runMatch(matchId);
  }

  @Get('tournament/:id')
  async getMatchesByTournament(@Param('id') tournamentId: string) {
    return this.matchsService.getMatchesByTournament(tournamentId);
  }
}
