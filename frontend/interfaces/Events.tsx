export interface NewEvent {
  id: number;
  gameId: string;
  group?: string;
  title: string;
  shortDescription?: string;
  longDescription?: string;
  eventType: string;
  gameSystem?: string;
  ageRequirement: string;
  experienceRequirement: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  duration: number;
  tournament: boolean;
  cost: number;
  location?: string;
  ticketsAvailable?: number;
  maxTickets?: number;
}

export interface rawEvent {
  'Game ID': string;
  Group?: string;
  Title: string;
  'Short Description'?: string;
  'Long Description'?: string;
  'Event Type': string;
  'Game System'?: string;
  'Rules Edition'?: string;
  'Minimum Players'?: string;
  'Maximum Players'?: string;
  'Age Required': string;
  'Experience Required': string;
  'Materials Required': string;
  'Materials Required Details'?: string;
  'Start Date & Time': string;
  Duration?: string;
  'End Date & Time': string;
  'GM Names'?: string;
  Website?: string;
  Email?: string;
  'Tournament?': 'No';
  'Round Number'?: string;
  'Total Rounds'?: string;
  'Minimum Play Time'?: string;
  'Attendee Registration?'?: string;
  'Cost $': string;
  Location?: string;
  'Room Name'?: string;
  'Table Number'?: '';
  'Special Category'?: string;
  'Tickets Available'?: string;
  'Last Modified': string;
}