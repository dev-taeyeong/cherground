import { Container } from 'inversify';
import { BannerController } from './api/controller';
import { BannerControllerImpl } from './api/controller/implements/BannerControllerImpl';
import { Routes, RoutesImpl } from './api/routes';
import { BannerRouter, BannerRouterImpl } from './api/routes/BannerRouter';
import { BannerRepositoryImpl } from './data/mock-data/BannerRepositoryImpl';
import { BannerRepository } from './domain/interactor/repositories';
import { BannerService } from './domain/service';
import { BannerServiceImpl } from './domain/service/implements/BannerServiceImpl';
import { TYPES } from './TYPES';

export const container = new Container();

container
  .bind<BannerRepository>(TYPES.BannerRepository)
  .to(BannerRepositoryImpl);
container.bind<BannerService>(TYPES.BannerService).to(BannerServiceImpl);
container
  .bind<BannerController>(TYPES.BannerController)
  .to(BannerControllerImpl);
container.bind<BannerRouter>(TYPES.BannerRouter).to(BannerRouterImpl);
container.bind<Routes>(TYPES.Routes).to(RoutesImpl);
