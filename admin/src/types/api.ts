import type { Content, Participant, Study } from '.';

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

export type ResponseParticipant = {
  totalPage: number;
  data: Participant[];
};
