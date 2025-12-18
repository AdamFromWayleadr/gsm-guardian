import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions for our database tables
export interface GSMUnit {
  id: string;
  phone_number: string;
  customer_name: string;
  property_name: string | null;
  property_code: string | null;
  city: string | null;
  state_province: string | null;
  country: string | null;
  platform: 'Vonage' | 'MessageBird';
  tier: 'Tier 1' | 'Tier 2' | 'Tier 3' | null;
  service_type: 'SMS' | 'Voice' | null;
  status: 'Active' | 'Inactive' | 'Issue';
  last_checked: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface CallRecord {
  id: string;
  phone_number: string;
  timestamp: string;
  platform: string;
  status: string;
  duration: number | null;
  latency: number | null;
  cost: number | null;
  error_code: string | null;
  attempt_type: 'user' | 'manual_test' | 'automated_test';
  triggered_by: string | null;
  raw_response: any;
  created_at: string;
}

export interface Incident {
  id: string;
  phone_number: string;
  severity: 'critical' | 'warning' | 'info';
  issue_type: string;
  description: string | null;
  detected_at: string;
  resolved_at: string | null;
  auto_resolved: boolean;
  acknowledged_by: string | null;
  related_call_records: string[] | null;
  metadata: any;
  created_at: string;
}

export interface GlobalStats {
  total_active_units: number;
  open_incidents: number;
  avg_success_rate_24h: number;
  monthly_cost: number;
  vonage_units: number;
  messagebird_units: number;
  avg_response_time_ms: number;
  failed_tests_24h: number;
}
