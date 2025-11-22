export interface NavItem {
  label: string;
  href: string;
}

export interface Partner {
  name: string;
  role: string;
  description: string;
}

export interface Insight {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
}

export interface ChatMessage {
  role: 'user' | 'model' | 'system';
  text: string;
}

export enum InvestmentPillar {
  PublicMarkets = 'Public Markets',
  PrivateMarkets = 'Private Markets',
  ClimateInfra = 'Climate & Infrastructure',
  SportsPerformance = 'Sports & Human Performance',
  RealEstate = 'Real Estate',
  Regenerative = 'Regenerative Investing'
}