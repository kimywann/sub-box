export type Service = {
  name: string;
  image: string;
};

export type ServiceCategory = {
  OTT: Service[];
  MUSIC: Service[];
  AI: Service[];
  ETC: Service[];
};
