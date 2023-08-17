import { Controller, Get, Post, Body, Patch,ParseIntPipe, Param,Query, Delete, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { UserInfoService } from './user-info.service';
import { CreateUserInfoDto } from './dto/create-user-info.dto';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { Result } from 'src/common/result';
import { UserInfo } from './entities/user-info.entity';
import {AdminGuard} from "../../guards/admin/admin.guard";
import {JwtGuard} from "../../guards/jwt/jwt.guard";
import { SerializeInterceptor } from 'src/interceptors/serialize/serialize.interceptor';

@Controller('userinfo')
export class UserInfoController {
  constructor(private readonly userInfoService: UserInfoService) {}

  @Post()
  async create(@Body() userInfo: UserInfo) {
    return new Result(await this.userInfoService.create(userInfo));
  }

  @Get()
  async findAll() {
    return new Result(await this.userInfoService.findAll());
  }

  @Get('self')
  async getUserinfoSelf(@Req() res:any) {
    const userId=res.user.userId
    return new Result(await this.userInfoService.findOne(userId))
  }

  @Get('/page')
  async findAllByPage(@Query('pageNum',new  ParseIntPipe()) pageNum:number,
                      @Query('pageSize',new  ParseIntPipe()) pageSize:number,
                      @Query('nickname') nickname:string,) {
    return new Result(await this.userInfoService.findAllByPage(pageNum,pageSize,nickname))
  }

  @Get(':id')
  @UseGuards(JwtGuard,AdminGuard)
  // @UseInterceptors(SerializeInterceptor)
  async findOne(@Param('id') id: string,@Req() req) {

    return new Result(await this.userInfoService.findOne(+id));
  }

  @Delete(':id/:flag')
  async remove(@Param('id') id: string,@Param('flag') flag:string) {
    return new Result(await this.userInfoService.remove(+id,+flag));
  }
}
