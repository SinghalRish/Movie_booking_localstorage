export interface movie {
  id: number;
  name?: string | null;
  url?: string | null;
  rating?: number | null;
  category?: string | null;
  ticketprice?: number | null;
  showdate?: string | null;
  showtime?: string | null;
  hall: number | null;
  description: string;
  enabled: boolean;
}
