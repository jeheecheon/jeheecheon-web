import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { assert } from "@packages/common/utils/assert";
import { Account } from "@packages/entities-blog/account/account.entity";
import { FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async getAccount(args: { email: string } | { id: string }) {
    const where: FindOptionsWhere<Account> = {};

    if ("email" in args) {
      where.normalizedEmail = this.normalizeEmail(args.email);
    }

    if ("id" in args) {
      where.id = args.id;
    }

    return this.accountRepository.findOne({
      where,
    });
  }

  async getAccountOrThrow(args: { email: string } | { id: string }) {
    const account = await this.getAccount(args);
    assert(account, new NotFoundException());

    return account;
  }

  async updateAccount(
    args: { email: string } | { id: string },
    account: Partial<Account>,
  ) {
    const where: FindOptionsWhere<Account> = {};

    if ("email" in args) {
      where.normalizedEmail = this.normalizeEmail(args.email);
    }

    if ("id" in args) {
      where.id = args.id;
    }

    return this.accountRepository.update(where, account);
  }

  async upsertAccount(args: { email: string }, account: Partial<Account>) {
    const existingAccount = await this.getAccount(args);

    if (existingAccount) {
      return this.updateAccount(args, account);
    }

    return this.accountRepository.save({
      ...account,
      normalizedEmail: this.normalizeEmail(args.email),
    });
  }

  normalizeEmail(email: string) {
    return email.toUpperCase().trim();
  }
}
