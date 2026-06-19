export type Status = "wishlist" | "applied" | "interview" | "offer" | "rejected";

export type Application = {
  id: string;
  user_id: string;
  company: string;
  role: string;
  status: Status;
  url: string | null;
  salary_min: number | null;
  salary_max: number | null;
  location: string | null;
  notes: string | null;
  applied_at: string | null;
  follow_up_at: string | null;
  created_at: string;
  updated_at: string;
}

export type CreateApplicationInput = {
  company: string;
  role: string;
  status?: Status;
  url?: string;
  salary_min?: number;
  salary_max?: number;
  location?: string;
  notes?: string;
  applied_at?: string;
  follow_up_at?: string;
}
