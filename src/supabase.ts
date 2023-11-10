import { createClient } from '@supabase/supabase-js';
import { ensureEnvVariables } from './commands/util/utils';
import * as dotenv from 'dotenv';

dotenv.config();

ensureEnvVariables(['DB_HOST', 'DB_PORT', 'DB_NAME', 'DB_PASSWORD', 'DB_USER', 'SUPABASE_SERVICE_KEY', 'SUPABASE_URL']);

export const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!, { auth: { persistSession: false } });
