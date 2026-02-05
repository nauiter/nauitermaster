import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { secret } = body;
    const expectedSecret = Deno.env.get("ADMIN_CREATION_SECRET");
    
    console.log("Received secret:", secret ? "provided" : "missing");
    console.log("Expected secret configured:", expectedSecret ? "yes" : "no");
    
    if (!expectedSecret || secret !== expectedSecret) {
      console.log("Secret mismatch");
      return new Response(JSON.stringify({ error: "Unauthorized" }), { 
        status: 401, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      });
    }

    console.log("Secret validated, creating admin...");

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const email = "nauiter-master@hotmail.com";
    const password = "nN!120895";

    // Check existing user
    const { data: users } = await supabaseAdmin.auth.admin.listUsers();
    const existing = users?.users?.find((u) => u.email === email);
    
    let userId: string;
    if (existing) {
      userId = existing.id;
      console.log("User exists:", userId);
    } else {
      const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });
      if (error) throw error;
      userId = data.user!.id;
      console.log("User created:", userId);
    }

    // Check/add admin role
    const { data: role } = await supabaseAdmin
      .from("user_roles")
      .select("*")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();

    if (!role) {
      const { error } = await supabaseAdmin
        .from("user_roles")
        .insert({ user_id: userId, role: "admin" });
      if (error) throw error;
      console.log("Admin role assigned");
    } else {
      console.log("Admin role exists");
    }

    return new Response(JSON.stringify({ success: true, userId }), { 
      status: 200, 
      headers: { ...corsHeaders, "Content-Type": "application/json" } 
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500, 
      headers: { ...corsHeaders, "Content-Type": "application/json" } 
    });
  }
});
