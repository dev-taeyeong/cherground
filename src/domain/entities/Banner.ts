export interface Notice {
  id: number;
  title: string;
  description: string;
  category: string;
  image_exposure: boolean;
  image_url: string;
  start_time: Date;
  end_time: Date;
}
