import { MediaLocation } from './domain/entities/MediaLocation';
import { Post } from './domain/entities/Post';

export const TYPES = {
  Routes: Symbol('Routes'),
  BannerRouter: Symbol('BannerRouter'),
  BannerController: Symbol('BannerController'),
  BannerService: Symbol('BannerService'),
  BannerRepository: Symbol('BannerRepository'),
};

export type CalendarData = {
  type: string;
  mediaLocation: MediaLocation;
  posts: Post[];
}[];

export type StateData = { live: boolean; reservation: boolean; end: boolean };
