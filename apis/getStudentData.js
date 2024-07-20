import supabase from "@/config/supabaseClient";

export async function getStudentData() {
  try {
    const {data, error} = await supabase.from("student-table").select("*");
    if (data) {
      return data;
    } else {
      console.error("Non-200 status code received:", error);
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
