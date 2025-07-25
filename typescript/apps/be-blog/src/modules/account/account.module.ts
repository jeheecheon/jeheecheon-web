import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Account } from "@packages/entities-blog/account/account.entity";
import { ExternalAuthenticationModule } from "../external-authentication/external-authentication.module.js";
import { AccountResolver } from "./account.resolver.js";
import { AccountService } from "./account.service.js";

@Module({
  imports: [TypeOrmModule.forFeature([Account]), ExternalAuthenticationModule],
  providers: [AccountService, AccountResolver],
  exports: [AccountService],
})
export class AccountModule {}
