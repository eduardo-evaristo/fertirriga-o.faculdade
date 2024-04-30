import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://suwcekiqjweyzzykscsi.supabase.co";
const supabaseKey =
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
    .eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1d2Nla2lxandleXp6eWtzY3NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ0OTg5NTQsImV4cCI6MjAzMDA3NDk1NH0
    .Ob5RCyJDxdsyhsi9dL3K0mNy_FeWN72QQH3_nPzqaBc;
const supabase = createClient(supabaseUrl, supabaseKey);



let { data: ferti, error } = await supabase.from("ferti").select("*");
console.log(ferti);