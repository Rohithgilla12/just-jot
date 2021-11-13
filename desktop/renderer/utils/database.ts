import { createClient } from "@supabase/supabase-js";
// import { PrismaClient } from "@prisma/client";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// export const db = new PrismaClient();
