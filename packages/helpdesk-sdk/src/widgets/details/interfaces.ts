export interface IDetailsWidgetApi {
  modifySection(section: ISection): Promise<void>;
}

export interface IDetailsWidgetEvents {
  customer_details_section_button_click: ITicketDetailsSectionButtonClick;
}

export interface ITicketDetailsSectionButtonClick {
  buttonId: string;
}

export interface ISection {
  title: string;
  components: SectionComponent[];
  imgUrl?: string;
  openApp?: boolean;
}

export type SectionComponent =
  | IButtonComponent
  | ILabelComponent
  | ILineComponent
  | ILinkComponent
  | ITitleComponent;

export enum SectionComponentType {
  Button = 'button',
  LabelValue = 'label_value',
  Title = 'title',
  Link = 'link',
  Line = 'line',
  Tags = 'tags'
}

export interface IButtonComponent {
  type: SectionComponentType.Button;
  data: {
    label: string;
    id: string;
    openApp?: boolean;
    primary?: boolean;
    secondary?: boolean;
  };
}

export interface ILabelComponent {
  type: SectionComponentType.LabelValue;
  data: {
    label?: string;
    value?: string;
    iconUrl?: string;
    url?: string;
  };
}

export interface ILineComponent {
  type: SectionComponentType.Line;
}

export interface ILinkComponent {
  type: SectionComponentType.Link;
  data: {
    url: string;
    value?: string;
    inline?: boolean;
  };
}

export interface ITitleComponent {
  type: SectionComponentType.Title;
  data: {
    title: string;
    value?: string;
    description?: string;
    imgUrl?: string;
    imgSize?: 'big' | 'small';
    link?: string;
    id?: string;
    clickable?: boolean;
    openApp?: boolean;
  };
}

export interface ITagsComponent {
  type: SectionComponentType.Tags;
  data: {
    tags: string[];
    label?: string;
  };
}

export interface ITicketInfo {
  id: string;
  shortId: string;
  date: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  lastMessageAt?: Date;
  events: any[];
  requester: any;
  status: any;
  spam: any;
  subject: string;
  source: any;
  tagIds: string[];
  teamIds: string[];
  assignment: any;
  ratingRequestSent: boolean;
  totalRatings: number;
  rating?: any;
  ccs?: any[];
  draft?: any;
  integrations?: any;
  priority: any;
  followers: string[];
  childTickets: any[];
  parentTicket: any;
  customFields?: any;
}
