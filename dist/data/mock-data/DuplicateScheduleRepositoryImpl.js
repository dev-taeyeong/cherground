"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicateScheduleRepositoryImpl = void 0;
const fs_1 = __importDefault(require("fs"));
const inversify_1 = require("inversify");
let DuplicateScheduleRepositoryImpl = class DuplicateScheduleRepositoryImpl {
    getDuplicateSchedule(contentType, title, service, bannerExposePlace, isLink, connectionLink, imageUrl, startTime, endTime) {
        const getDuplicateScheduleData = new Promise((resolve, reject) => {
            fs_1.default.readFile('./src/data/mock-data/data.json', 'utf-8', (err, data) => {
                if (err)
                    reject(err);
                else
                    resolve(JSON.parse(data).duplicateSchedule);
            });
        });
        return getDuplicateScheduleData.then((data) => data.filter((duplicateSchedule) => {
            if (new Date(duplicateSchedule.scheduleStartTime).getTime() <
                new Date(endTime).getTime() &&
                new Date(duplicateSchedule.scheduleEndTime).getTime() >
                    new Date(startTime).getTime()) {
                return duplicateSchedule;
            }
        }));
    }
    createDuplicateSchedule(duplicateSchedules) {
        const getDuplicateSchedules = new Promise((resolve, reject) => {
            fs_1.default.readFile('./src/data/mock-data/data.json', 'utf-8', (err, data) => {
                if (err)
                    reject(err);
                else
                    resolve(JSON.parse(data).duplicateSchedule);
            });
        });
        return getDuplicateSchedules.then((duplicateScheduleDatas) => {
            duplicateSchedules.forEach((duplicateSchedule) => {
                if (duplicateSchedule.id === null) {
                    duplicateSchedule.id = duplicateScheduleDatas.length + 1 + '';
                    duplicateScheduleDatas.push(duplicateSchedule);
                }
                else {
                    duplicateScheduleDatas.forEach((duplicateScheduleData, index) => {
                        if (duplicateScheduleData.id === duplicateSchedule.id) {
                            duplicateScheduleDatas[index] = duplicateSchedule;
                        }
                    });
                }
            });
            fs_1.default.writeFile('./src/data/mock-data/update-duplicateSchedule.json', JSON.stringify(duplicateScheduleDatas), (err) => {
                if (err)
                    console.log(err);
            });
        });
    }
};
DuplicateScheduleRepositoryImpl = __decorate([
    (0, inversify_1.injectable)()
], DuplicateScheduleRepositoryImpl);
exports.DuplicateScheduleRepositoryImpl = DuplicateScheduleRepositoryImpl;
