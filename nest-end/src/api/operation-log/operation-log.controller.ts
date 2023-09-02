import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OperationLogService } from './operation-log.service';
import { CreateOperationLogDto } from './dto/create-operation-log.dto';
import { UpdateOperationLogDto } from './dto/update-operation-log.dto';
import {Logger} from "../logger/entities/logger.entity";
import {Result} from "../../common/result";
import {OperationLog} from "./entities/operation-log.entity";
import { JwtGuard } from 'src/guards/jwt/jwt.guard';
import { AdminGuard } from 'src/guards/admin/admin.guard';

@Controller('operation-log')
export class OperationLogController {
  constructor(private readonly operationLogService: OperationLogService) {}

  @Post()
  async create(@Body() operationLog:OperationLog) {
    return new Result(await this.operationLogService.create(operationLog))
  }

  @Get()
  async findAll() {
    return new Result(await this.operationLogService.findAll())
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.operationLogService.findOne(+id);
  }

  @UseGuards(JwtGuard,AdminGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return new Result(await this.operationLogService.remove(+id))
  }

  @UseGuards(JwtGuard,AdminGuard)
  @Post('ids')
  async removeLogs(@Body() ids:number[]) {
    return new Result(await this.operationLogService.removeLogs(ids))
  }


}
