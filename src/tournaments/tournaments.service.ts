import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Tournament, Match } from '@prisma/client';

@Injectable()
export class TournamentsService {
  constructor(private readonly prisma: PrismaService) {}

  async createTournament(name: string): Promise<Tournament> {
    return await this.prisma.tournament.create({
      data: { name, status: 'pending' },
    });
  }

  async startTournament(tournamentId: string): Promise<Tournament> {
    return await this.prisma.tournament.update({
      where: { id: tournamentId },
      data: { status: 'active' },
    });
  }

  async finishTournament(tournamentId: string): Promise<Tournament> {
    return await this.prisma.tournament.update({
      where: { id: tournamentId },
      data: { status: 'finished' },
    });
  }

  async getTournamentMatches(tournamentId: string): Promise<Match[]> {
    const matches = await this.prisma.match.findMany({
      where: { tournamentId },
      include: {
        player1: { select: { id: true, username: true, email: true } },
        player2: { select: { id: true, username: true, email: true } },
        winner: { select: { id: true, username: true, email: true } },
      },
    });

    return matches;
  }
}
