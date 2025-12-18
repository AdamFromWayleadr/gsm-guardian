import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ========================================
// TypeScript Interfaces for Database Views
// ========================================

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

export interface UnitHealthSummary {
  phone_number: string;
  customer_name: string;
  platform: string;
  service_type: string;
  unit_status: string;
  calls_24h: number;
  calls_7d: number;
  success_rate_24h: number | null;
  last_activity: string | null;
  open_incidents: number;
  avg_response_ms: number | null;
  cost_30d: number | null;
}

export interface RecentActivity {
  id: string;
  phone_number: string;
  customer_name: string | null;
  platform: string;
  timestamp: string;
  status: string;
  duration: number | null;
  latency: number | null;
  cost: number | null;
  error_code: string | null;
  attempt_type: string;
  triggered_by: string | null;
  is_successful: boolean;
  response_time_ms: number | null;
}

export interface CustomerStats {
  customer_name: string;
  total_units: number;
  calls_24h: number;
  calls_7d: number;
  calls_30d: number;
  success_rate_24h: number | null;
  open_issues: number;
  monthly_cost: number | null;
  last_activity: string | null;
}

export interface PlatformComparison {
  platform: string;
  total_units: number;
  calls_24h: number;
  success_rate_24h: number | null;
  avg_response_ms: number | null;
  cost_30d: number | null;
}
