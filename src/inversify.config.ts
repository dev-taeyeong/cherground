import { Container } from 'inversify';
import {
  AnnounceController,
  BannerController,
  DuplicateScheduleController,
} from './api/controller';
import { AnnounceControllerImpl } from './api/controller/implements/AnnounceControllerImpl';
import { BannerControllerImpl } from './api/controller/implements/BannerControllerImpl';
import { DuplicateScheduleControllerImpl } from './api/controller/implements/DuplicateScheduleController';
import { Routes, RoutesImpl } from './api/routes';
import {
  AnnounceRouter,
  AnnounceRouterImpl,
} from './api/routes/AnnounceRouter';
import { BannerRouter, BannerRouterImpl } from './api/routes/BannerRouterImpl';
import {
  DuplicateScheduleRouter,
  DuplicateScheduleRouterImpl,
} from './api/routes/DuplicateScheduleRouterImpl';
import { AnnounceRepositoryImpl } from './data/mock-data/AnnounceRepositoryImpl';
import { BannerRepositoryImpl } from './data/mock-data/BannerRepositoryImpl';
import { DuplicateScheduleRepositoryImpl } from './data/mock-data/DuplicateScheduleRepositoryImpl';
import {
  AnnounceRepository,
  BannerRepository,
  DuplicateScheduleRepository,
} from './domain/interactor/repositories';
import {
  AnnounceService,
  BannerService,
  DuplicateScheduleService,
} from './domain/service';
import { AnnounceServiceImpl } from './domain/service/implements/AnnounceServiceImpl';
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

// Announce
container
  .bind<AnnounceRepository>(TYPES.AnnounceRepository)
  .to(AnnounceRepositoryImpl);
container.bind<AnnounceService>(TYPES.AnnounceService).to(AnnounceServiceImpl);
container
  .bind<AnnounceController>(TYPES.AnnounceController)
  .to(AnnounceControllerImpl);
container.bind<AnnounceRouter>(TYPES.AnnounceRouter).to(AnnounceRouterImpl);
