export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      lucy_conversations: {
        Row: {
          created_at: string
          id: string
          lead_id: string | null
          messages: Json | null
          session_id: string
          updated_at: string
          user_info: Json | null
        }
        Insert: {
          created_at?: string
          id?: string
          lead_id?: string | null
          messages?: Json | null
          session_id: string
          updated_at?: string
          user_info?: Json | null
        }
        Update: {
          created_at?: string
          id?: string
          lead_id?: string | null
          messages?: Json | null
          session_id?: string
          updated_at?: string
          user_info?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "lucy_conversations_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "mentorship_leads"
            referencedColumns: ["id"]
          },
        ]
      }
      lucy_knowledge: {
        Row: {
          answer_en: string
          answer_pt: string
          category: string
          created_at: string
          id: string
          is_active: boolean | null
          priority: number | null
          question_en: string
          question_pt: string
          updated_at: string
        }
        Insert: {
          answer_en: string
          answer_pt: string
          category: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          priority?: number | null
          question_en: string
          question_pt: string
          updated_at?: string
        }
        Update: {
          answer_en?: string
          answer_pt?: string
          category?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          priority?: number | null
          question_en?: string
          question_pt?: string
          updated_at?: string
        }
        Relationships: []
      }
      mentorship_leads: {
        Row: {
          company: string | null
          conversation: Json | null
          created_at: string
          email: string
          id: string
          interest_tier: string | null
          name: string
          phone: string | null
          qualification_score: number | null
          qualified_at: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          company?: string | null
          conversation?: Json | null
          created_at?: string
          email: string
          id?: string
          interest_tier?: string | null
          name: string
          phone?: string | null
          qualification_score?: number | null
          qualified_at?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          company?: string | null
          conversation?: Json | null
          created_at?: string
          email?: string
          id?: string
          interest_tier?: string | null
          name?: string
          phone?: string | null
          qualification_score?: number | null
          qualified_at?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "mentorship_leads_interest_tier_fkey"
            columns: ["interest_tier"]
            isOneToOne: false
            referencedRelation: "mentorship_tiers"
            referencedColumns: ["tier_key"]
          },
        ]
      }
      mentorship_tiers: {
        Row: {
          created_at: string
          description_en: string | null
          description_pt: string | null
          display_order: number | null
          features_en: Json | null
          features_pt: Json | null
          id: string
          is_available: boolean | null
          name_en: string
          name_pt: string
          price_en: string | null
          price_pt: string | null
          tier_key: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description_en?: string | null
          description_pt?: string | null
          display_order?: number | null
          features_en?: Json | null
          features_pt?: Json | null
          id?: string
          is_available?: boolean | null
          name_en: string
          name_pt: string
          price_en?: string | null
          price_pt?: string | null
          tier_key: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description_en?: string | null
          description_pt?: string | null
          display_order?: number | null
          features_en?: Json | null
          features_pt?: Json | null
          id?: string
          is_available?: boolean | null
          name_en?: string
          name_pt?: string
          price_en?: string | null
          price_pt?: string | null
          tier_key?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          id: string
          key: string
          updated_at: string
          updated_by: string | null
          value: Json
        }
        Insert: {
          id?: string
          key: string
          updated_at?: string
          updated_by?: string | null
          value?: Json
        }
        Update: {
          id?: string
          key?: string
          updated_at?: string
          updated_by?: string | null
          value?: Json
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
