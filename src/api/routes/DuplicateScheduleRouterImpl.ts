import express, { Router } from 'express';
import { inject, injectable } from 'inversify';
import { Banner } from '../../domain/entities/Banner';
import { DuplicateSchedule } from '../../domain/entities/DuplicateSchedule';
import { TYPES } from '../../TYPES';
import { DuplicateScheduleController } from '../controller';

export interface DuplicateScheduleRouter {
  router: Router;
}

@injectable()
export class DuplicateScheduleRouterImpl implements DuplicateScheduleRouter {
  router: Router;
  private duplicateScheduleController: DuplicateScheduleController;

  constructor(
    @inject(TYPES.DuplicateScheduleController)
    duplicateScheduleController: DuplicateScheduleController
  ) {
    this.duplicateScheduleController = duplicateScheduleController;
    this.router = express.Router();

    this.router.post('/', (req, res) => {
      const bannerData: Banner = req.body;

      this.duplicateScheduleController
        .adjustDuplicateSchedule(bannerData)
        .then((data) => {
          res.status(200).json(data);
        });
    });

    this.router.put('/', (req, res) => {
      const {
        duplicateSchedules,
        createdBannerId,
      }: { duplicateSchedules: DuplicateSchedule[]; createdBannerId: string } =
        req.body;
      this.duplicateScheduleController
        .makeDuplicateSchedule(duplicateSchedules, createdBannerId)
        .then((data) => res.status(201).json({ message: 'CREATE_SUCCESS' }));
    });
  }
}
