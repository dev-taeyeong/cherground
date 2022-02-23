interface Notice {
  id: Number;
  title: string;
  description: string;
  category_id: number;
  sub_location_id: number;
  image_url: string;
  image_exposure: boolean;
  start_time: string;
  end_time: string;
}

interface Banner {
  id: Number;
  title: string;
  description: string;
  sub_location_id: number;
  image_url: string;
  link_url: string;
  start_time: string;
  end_time: string;
}

interface NoticeCategory {
  id: Number;
  name: string;
}

interface MainLocation {
  id: Number;
  name: string;
}

interface SubLocation {
  id: Number;
  main_locator_id: Number;
  name: string;
}

interface ExposureTime {
  id: Number;
  name: string;
}
