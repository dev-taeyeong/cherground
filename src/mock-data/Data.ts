const data = {
  productType: [
    {
      id: 1,
      name: '소매',
    },
    {
      id: 2,
      name: '도매',
    },
  ],

  mediaLocation: [
    {
      id: 1,
      name: '대시보드01',
    },
    {
      id: 2,
      name: '대시보드02',
    },
    {
      id: 3,
      name: '주문01',
    },
    {
      id: 4,
      name: '알림톡01',
    },
  ],

  noticeCategory: [
    { id: 1, name: '정보' },
    { id: 2, name: '에러' },
    { id: 3, name: '경고' },
    { id: 4, name: '성공' },
  ],

  notice: {
    id: 1,
    description: 'hello',
    noticeCategory: 1,
    exposureMethod: false,
    imageUrl: 'https://www.google.co.kr/',
    postId: 1,
  },

  post: [
    {
      id: 1,
      title: 'hi',
      type: 'Notice',
      productType: 1,
      mediaLocation: 1,
      startTime: new Date(2022, 1, 10, 3, 50),
      endTime: new Date(2022, 1, 15, 12, 0),
    },
    {
      id: 2,
      title: 'Banner1',
      type: 'Banner',
      productType: { id: 1, name: '소매' },
      mediaLocation: { id: 2, name: '대시보드02' },
      startTime: new Date('2022-02-11T15:00:00.000Z'),
      endTime: new Date('2022-02-15T15:00:00.000Z'),
    },
    {
      id: 3,
      title: 'Banner2',
      type: 'Banner',
      productType: { id: 1, name: '소매' },
      mediaLocation: { id: 2, name: '대시보드02' },
      startTime: new Date('2022-02-13T15:00:00.000Z'),
      endTime: new Date('2022-02-19T15:00:00.000Z'),
    },
  ],

  banner: [
    {
      id: 1,
      linkUrl: 'https://www.google.co.kr/',
      imageUrl: 'https://www.google.co.kr/',
      postId: 2,
      title: 'Banner1',
      type: 'Banner',
      productType: { id: 1, name: '소매' },
      mediaLocation: { id: 2, name: '대시보드02' },
      startTime: new Date('2022-02-11T15:00:00.000Z'),
      endTime: new Date('2022-02-15T15:00:00.000Z'),
    },
    {
      id: 2,
      linkUrl: 'https://www.google.co.kr/',
      imageUrl: 'https://www.google.co.kr/',
      postId: 2,
      title: 'Banner2',
      type: 'Banner',
      productType: { id: 1, name: '소매' },
      mediaLocation: { id: 2, name: '대시보드02' },
      startTime: new Date('2022-02-13T15:00:00.000Z'),
      endTime: new Date('2022-02-19T15:00:00.000Z'),
    },
  ],

  overlapBannerSchedule: [
    {
      id: 1,
      overlapBanners: [
        {
          banner: {
            id: 1,
            linkUrl: 'https://www.google.co.kr/',
            imageUrl: 'https://www.google.co.kr/',
            postId: 2,
            title: 'Banner1',
            type: 'Banner',
            productType: { id: 1, name: '소매' },
            mediaLocation: { id: 2, name: '대시보드02' },
            startTime: new Date('2022-02-11T15:00:00.000Z'),
            endTime: new Date('2022-02-15T15:00:00.000Z'),
          },
          exposureOrdinal: 1,
        },
      ],
      mediaLocation: { id: 2, name: '대시보드02' },
      exposurePeriod: 4,
      scheduleStartTime: new Date('2022-02-11T15:00:00.000Z'),
      scheduleEndTime: new Date('2022-02-13T15:00:00.000Z'),
    },
    {
      id: 2,
      overlapBanners: [
        {
          banner: {
            id: 1,
            linkUrl: 'https://www.google.co.kr/',
            imageUrl: 'https://www.google.co.kr/',
            postId: 2,
            title: 'Banner1',
            type: 'Banner',
            productType: { id: 1, name: '소매' },
            mediaLocation: { id: 2, name: '대시보드02' },
            startTime: new Date('2022-02-11T15:00:00.000Z'),
            endTime: new Date('2022-02-15T15:00:00.000Z'),
          },
          exposureOrdinal: 1,
        },
        {
          banner: {
            id: 2,
            linkUrl: 'https://www.google.co.kr/',
            imageUrl: 'https://www.google.co.kr/',
            postId: 2,
            title: 'Banner2',
            type: 'Banner',
            productType: { id: 1, name: '소매' },
            mediaLocation: { id: 2, name: '대시보드02' },
            startTime: new Date('2022-02-13T15:00:00.000Z'),
            endTime: new Date('2022-02-19T15:00:00.000Z'),
          },
          exposureOrdinal: 2,
        },
      ],
      mediaLocation: { id: 2, name: '대시보드02' },
      exposurePeriod: 4,
      scheduleStartTime: new Date('2022-02-13T15:00:00.000Z'),
      scheduleEndTime: new Date('2022-02-15T15:00:00.000Z'),
    },
    {
      id: 3,
      overlapBanners: [
        {
          banner: {
            id: 2,
            linkUrl: 'https://www.google.co.kr/',
            imageUrl: 'https://www.google.co.kr/',
            postId: 2,
            title: 'Banner2',
            type: 'Banner',
            productType: { id: 1, name: '소매' },
            mediaLocation: { id: 2, name: '대시보드02' },
            startTime: new Date('2022-02-13T15:00:00.000Z'),
            endTime: new Date('2022-02-19T15:00:00.000Z'),
          },
          exposureOrdinal: 1,
        },
      ],
      mediaLocation: { id: 2, name: '대시보드02' },
      exposurePeriod: 4,
      scheduleStartTime: new Date('2022-02-15T15:00:00.000Z'),
      scheduleEndTime: new Date('2022-02-19T15:00:00.000Z'),
    },
  ],
};

export default data;
