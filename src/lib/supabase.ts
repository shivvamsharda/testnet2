
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kwmxlwnkwxcsxosqjmrj.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3bXhsd25rd3hjc3hvc3FqbXJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5ODY2NDUsImV4cCI6MjA2MjU2MjY0NX0.JnzNmPosLdcuxQhf5gk2lITjP6FiKnCljJu6n6oc3yc";

export const supabase = createClient(supabaseUrl, supabaseKey);
