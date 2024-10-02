import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

const projectURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const publicKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!projectURL) throw new Error("No projectURL provided");
if (!publicKey) throw new Error("No publicKey provided");

const supabase = createClient<Database>(projectURL, publicKey);

export default supabase;
