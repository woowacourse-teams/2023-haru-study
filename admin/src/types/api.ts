import type { Content, Study } from '.';

export type ResponseStudies = {
  totalPage: number;
  data: Study[];
};

export type ResponseStudiesDetail = {
  studyId: number;
  studyName: string;
  totalPage: number;
  contents: Content[];
};
