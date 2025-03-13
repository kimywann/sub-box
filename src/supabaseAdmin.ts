import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const serviceRoleKey = import.meta.env.VITE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error('환경 변수가 설정되지 않았습니다. (VITE_SUPABASE_URL, VITE_SERVICE_ROLE_KEY)');
}

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    storageKey: 'supabase-admin-key',
    detectSessionInUrl: false,
  },
});

export const adminAuthClient = supabaseAdmin.auth.admin;
