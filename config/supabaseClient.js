import {createClient} from "@supabase/supabase-js";

const supabaseUrl = "https://vzsmbvoajkuqwdalbmjl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6c21idm9hamt1cXdkYWxibWpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg3NzA2MjMsImV4cCI6MjAzNDM0NjYyM30.2ilG7KLX9rGdh0KxzC-_G_SlZPzKryzYLcj9y4eMcoY";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
