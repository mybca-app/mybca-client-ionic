export type Event = {
  id: string;
  title: string;
  description?: string;
  location?: string;
  organization?: string;
  created: string;
  updated: string;
  eventTime: string;
  expand: Record<string, any>;
};

export type Organization = {
  id: string;
  name: string;
  created: string;
  updated: string;
};
