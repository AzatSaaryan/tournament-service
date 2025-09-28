import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit(this: PrismaService): Promise<void> {
    await this.$connect();
  }

  async onModuleDestroy(this: PrismaService): Promise<void> {
    await this.$disconnect();
  }
}
