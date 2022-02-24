export interface Notice {
  id: number;
  title: string;
  description: string;
  noticeCategoryId: number;
  subLocationId: number;
  exposureMethod: boolean;
  imageUrl: string;
  startTime: Date;
  endTime: Date;
}
