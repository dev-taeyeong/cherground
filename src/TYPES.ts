export const TYPES = {
  OrmConfig: Symbol('OrmConfig'),
  Routes: Symbol('Routes'),

  // Banner
  BannerRouter: Symbol('BannerRouter'),
  BannerController: Symbol('BannerController'),
  BannerService: Symbol('BannerService'),
  BannerRepository: Symbol('BannerRepository'),
  BannerDao: Symbol('BannerDao'),

  // DuplicateSchedule
  DuplicateScheduleRouter: Symbol('DuplicateRouter'),
  DuplicateScheduleController: Symbol('DuplicateScheduleController'),
  DuplicateScheduleService: Symbol('DuplicateScheduleService'),
  DuplicateScheduleRepository: Symbol('DuplicateScheduleRepository'),
  DuplicateScheduleDao: Symbol('DuplicateScheduleDao'),

  // Announce
  AnnounceRouter: Symbol('AnnounceRouter'),
  AnnounceController: Symbol('AnnounceController'),
  AnnounceService: Symbol('AnnounceService'),
  AnnounceRepository: Symbol('AnnounceRepository'),
  AnnounceDao: Symbol('AnnounceDao'),
};

export type StateData = { live: boolean; reservation: boolean; end: boolean };
