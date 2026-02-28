// TypeScript type definitions matching the YAML frontmatter shape

export interface NavItem {
  active: boolean;
  src: string;
  title: string;
}

export interface NavButton {
  active: boolean;
  src: string;
  title: string;
}

export interface SocialIcon {
  active: boolean;
  icon: string;
  src: string;
  title: string;
}

export interface NavData {
  button: NavButton;
  items: NavItem[];
  socialicons: { items: SocialIcon[] };
}

export interface HeroData {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  image?: string;
  imagePt?: string;
  button?: { title: string; link: string };
}

export interface AboutData {
  id: string;
  title: string;
  paragraph: string;
  linkTitle: string;
  link: string;
  logo?: string;
}

export interface StatItem {
  title: string;
  paragraph: string;
}

export interface StatData {
  id?: string;
  image?: string;
  imagePt?: string;
  items: StatItem[];
}

export interface MediaTileItem {
  title: string;
  active: boolean;
  type: string;
  src: string;
  colDesk?: string;
  image?: string;
}

export interface MediaTilesData {
  title: string;
  subtitle?: string;
  id: string;
  items: MediaTileItem[];
}

export interface SpeakerFields {
  id: string;
  name: string;
  title: string;
  company: string;
  city: string;
  country: string;
  bio: string;
  image?: string;
  socialLinks: { src: string; icon: string }[];
}

export interface Talk {
  id: string;
  title: string;
  description?: string;
}

export interface SpeakerItem {
  fields: SpeakerFields;
  talk: Talk;
}

export interface ConferenceSpeakers {
  id: string;
  title: string;
  subtitle?: string;
  items: SpeakerItem[];
}

export interface TalkItem {
  talk: Talk;
  speaker: {
    id: string;
    name: string;
    image?: string;
  };
}

export interface TalksData {
  title: string;
  subtitle?: string;
  id: string;
  items: TalkItem[];
}

export interface ScheduleTableItem {
  talk: { id: string; title: string };
  speaker: { id: string; name: string };
}

export interface PricingItem {
  title: string;
  status: string;
  caption?: string;
  btnLabel: string;
  btnSrc: string;
  price: number;
}

export interface PricingData {
  title: string;
  subtitle?: string;
  id: string;
  currency: string;
  col?: string;
  items: PricingItem[];
}

export interface LocationData {
  id: string;
  title: string;
  image?: string;
  imagePt?: string;
  logo?: string;
  name: string;
  address: string;
  mapLinkDirect?: string;
  mapLinkIframe?: string;
  mapLinkGoogle?: string;
}

export interface PartnerFields {
  title: string;
  description?: string;
  image?: string;
  src: string;
}

export interface PartnerItem {
  active: boolean;
  fields: PartnerFields;
}

export interface PartnerGroup {
  id: string;
  title: string;
  subtitle?: string;
  items: PartnerItem[];
}

export interface PartnersData {
  partners: PartnerGroup;
  friends: PartnerGroup;
  mediapartners: PartnerGroup;
}

export interface ConferenceData {
  title: string;
  startDate: string;
  nav: NavData;
  hero: HeroData;
  heropt: HeroData;
  herocf: HeroData;
  about: AboutData;
  stat: StatData;
  mediaTiles: MediaTilesData;
  playlists?: MediaTilesData;
  pricing: PricingData;
  location: LocationData;
}

export interface SpeakersDataFile {
  title: string;
  confspeakers: ConferenceSpeakers;
  speakers: ConferenceSpeakers;
  talks: TalksData;
  schedule: { title: string; id: string };
  scheduletable: { items: ScheduleTableItem[] };
}

export interface PolicyData {
  title: string;
  titleUA: string;
  description: string;
  descriptionUA: string;
}
