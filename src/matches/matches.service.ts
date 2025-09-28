import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Match } from '@prisma/client';

@Injectable()
export class MatchsService {
  constructor(private prisma: PrismaService) {}

  async createMatch(
    tournamentId: string,
    player1Id: string,
    player2Id: string,
  ): Promise<Match> {
    return await this.prisma.match.create({
      data: {
        tournamentId,
        player1Id,
        player2Id,
      },
    });
  }

  async runMatch(matchId: string): Promise<Match> {
    const match = await this.prisma.match.findUnique({
      where: { id: matchId },
    });

    if (!match) throw new Error('Match not found');

    const winnerId = Math.random() < 0.5 ? match.player1Id : match.player2Id;

    return await this.prisma.match.update({
      where: { id: matchId },
      data: { winnerId },
    });
  }

  async getMatchesByTournament(tournamentId: string): Promise<Match[]> {
    const matches = await this.prisma.match.findMany({
      where: { tournamentId },
      include: {
        player1: {
          select: { id: true, username: true, email: true, createdAt: true },
        },
        player2: {
          select: { id: true, username: true, email: true, createdAt: true },
        },
        winner: {
          select: { id: true, username: true, email: true, createdAt: true },
        },
      },
    });

    return matches.map((m) => ({
      id: m.id,
      tournamentId: m.tournamentId,
      player1Id: m.player1Id,
      player2Id: m.player2Id,
      winnerId: m.winnerId,
      createdAt: m.createdAt,
      player1: m.player1,
      player2: m.player2,
      winner: m.winner ?? null,
    }));
  }
}
