import { supabase } from "../../utils/database";

// Example of how to verify and get user data server-side.
const getUser = async (req, res) => {
  const token = req.headers.token;

  console.log("Get User");

  const { data: user, error } = await supabase.auth.api.getUser(token);

  if (error) return res.status(401).json({ error: error.message });
  return res.status(200).json(user);
};

export default getUser;
