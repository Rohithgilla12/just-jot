import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../utils/database";

// GET /api/notes
// Get all notes of the user from the database
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data: user, error } = await supabase.auth.api.getUserByCookie(req);

  console.log("USER in SERVER");
  console.log(error);
  console.log(error);
  console.log("USER in SERVER");

  if (!user) {
    res.status(401).json({ error: "Not logged in" });
    return;
  } else {
    const { data: notes, error } = await supabase.from("Note").select("*");
    //   .eq("user_id", user.id);

    if (error) {
      res.status(500).json({ error });
      return;
    } else {
      res.status(200).json({ notes });
      return;
    }
  }
}
