export interface Bill {
  session_id?: number;
  bill_id: number;
  number: string;
  title: string;
  description: string;
  status: string;
  status_date: string;
}
