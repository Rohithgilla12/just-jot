/**
 * NOTE: this file is only needed if you're doing SSR (getServerSideProps)!
 */

import { supabase } from "../../utils/database";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  supabase.auth.api.setAuthCookie(req, res);
}
