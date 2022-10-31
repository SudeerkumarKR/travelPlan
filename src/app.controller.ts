import { Param, Post, Query } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('search')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':strings')
  getHello(@Param('strings') searchString: string) {
    Logger.debug("data",searchString)

    return this.appService.getCitys(searchString.charAt(0).toUpperCase() + searchString.slice(1));
  }

  @Post()
  getShortestDistance(@Body() cityName: object) {
    Logger.debug("data",cityName['city'])
    
    return this.appService.getShortestDistance(cityName['city']);
  }
}
