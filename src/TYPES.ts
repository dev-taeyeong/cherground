export const TYPES = {
  Routes: Symbol('Routes'),

  // Banner
  BannerRouter: Symbol('BannerRouter'),
  BannerController: Symbol('BannerController'),
  BannerService: Symbol('BannerService'),
  BannerRepository: Symbol('BannerRepository'),

  // DuplicateSchedule
  DuplicateScheduleRouter: Symbol('DuplicateRouter'),
  DuplicateScheduleController: Symbol('DuplicateScheduleController'),
  DuplicateScheduleService: Symbol('DuplicateScheduleService'),
  DuplicateScheduleRepository: Symbol('DuplicateScheduleRepository'),
};

export type StateData = { live: boolean; reservation: boolean; end: boolean };
