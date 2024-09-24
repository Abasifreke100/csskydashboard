export interface Ticket {
  id: string;
  account_id: string;
  user_id: string;
  subject: string;
  type: string;
  priority: string;
  due: string;
  status: string;
  assigned_to: string;
  group_name: string;
  created: string;
  opened_by: string | null;
  involved_by: string | null;
  rating: string | null;
  closed_time: string | null;
  closed_by: string | null;
  label: string;
  resolution_type: string | null;
  resolution_subject: string | null;
  created_by: string;
  created_from: string;
  public_number: string;
  nas_port_id: string;
  source: string;
  preferred_time: string;
  time_interval: string;
}
