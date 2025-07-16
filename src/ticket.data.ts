export interface ticket {
  movieName: string;
  hallNo: number;
  date: string;
  time: string;
  seats: string[];
  totalPrice: number;
  user: {
    name: string;
    email: string;
  };
}
