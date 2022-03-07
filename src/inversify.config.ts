import { Container } from 'inversify';
import {
  BannerController,
  DuplicateScheduleController,
} from './api/controller';
import { BannerControllerImpl } from './api/controller/implements/BannerControllerImpl';
import { DuplicateScheduleControllerImpl } from './api/controller/implements/DuplicateScheduleController';
import { Routes, RoutesImpl } from './api/routes';
import { BannerRouter, BannerRouterImpl } from './api/routes/BannerRouter';
import {
  DuplicateScheduleRouter,
  DuplicateScheduleRouterImpl,
} from './api/routes/DuplicateScheduleRouter';
import { BannerRepositoryImpl } from './data/mock-data/BannerRepositoryImpl';
import { DuplicateScheduleRepositoryImpl } from './data/mock-data/DuplicateScheduleRepositoryImpl';
import {
  BannerRepository,
  DuplicateScheduleRepository,
} from './domain/interactor/repositories';
import { BannerService, DuplicateScheduleService } from './domain/service';
import { BannerServiceImpl } from './domain/service/implements/BannerServiceImpl';
import { DuplicateScheduleServiceImpl } from './domain/service/implements/DuplicateScheduleServiceImpl';
import { TYPES } from './TYPES';

export const container = new Container();

// Routes
container.bind<Routes>(TYPES.Routes).to(RoutesImpl);

// Banner
container
  .bind<BannerRepository>(TYPES.BannerRepository)
  .to(BannerRepositoryImpl);
container.bind<BannerService>(TYPES.BannerService).to(BannerServiceImpl);
container
  .bind<BannerController>(TYPES.BannerController)
  .to(BannerControllerImpl);
container.bind<BannerRouter>(TYPES.BannerRouter).to(BannerRouterImpl);

// DuplicateSchedule
container
  .bind<DuplicateScheduleRepository>(TYPES.DuplicateScheduleRepository)
  .to(DuplicateScheduleRepositoryImpl);
container
  .bind<DuplicateScheduleService>(TYPES.DuplicateScheduleService)
  .to(DuplicateScheduleServiceImpl);
container
  .bind<DuplicateScheduleController>(TYPES.DuplicateScheduleController)
  .to(DuplicateScheduleControllerImpl);
container
  .bind<DuplicateScheduleRouter>(TYPES.DuplicateScheduleRouter)
  .to(DuplicateScheduleRouterImpl);
