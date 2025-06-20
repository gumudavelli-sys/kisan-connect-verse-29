export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      documents: {
        Row: {
          document_type: string
          file_name: string
          file_type: string
          file_url: string
          id: string
          uploaded_at: string
          user_id: string
          verified: boolean | null
        }
        Insert: {
          document_type: string
          file_name: string
          file_type: string
          file_url: string
          id?: string
          uploaded_at?: string
          user_id: string
          verified?: boolean | null
        }
        Update: {
          document_type?: string
          file_name?: string
          file_type?: string
          file_url?: string
          id?: string
          uploaded_at?: string
          user_id?: string
          verified?: boolean | null
        }
        Relationships: []
      }
      grievances: {
        Row: {
          anonymous: boolean | null
          audio_url: string | null
          description: string
          id: string
          image_url: string | null
          location_address: string | null
          location_coordinates: string | null
          status: string | null
          submitted_at: string
          title: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          anonymous?: boolean | null
          audio_url?: string | null
          description: string
          id?: string
          image_url?: string | null
          location_address?: string | null
          location_coordinates?: string | null
          status?: string | null
          submitted_at?: string
          title: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          anonymous?: boolean | null
          audio_url?: string | null
          description?: string
          id?: string
          image_url?: string | null
          location_address?: string | null
          location_coordinates?: string | null
          status?: string | null
          submitted_at?: string
          title?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          message: string
          read_status: boolean | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          read_status?: boolean | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          read_status?: boolean | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          bank_linked: boolean | null
          caste_category: string | null
          created_at: string
          data_usage_permission: boolean | null
          date_of_birth: string | null
          disability_percent: number | null
          district: string | null
          education: string | null
          electricity_type: string | null
          full_name: string
          gender: string | null
          home_ownership: string | null
          id: string
          income: number | null
          land_area: number | null
          language_preference: string | null
          mandal: string | null
          minority: boolean | null
          occupation: string | null
          orphan_status: boolean | null
          own_land: boolean | null
          phone: string | null
          profile_completed: boolean | null
          ration_card_type: string | null
          updated_at: string
          user_id: string
          widow_status: boolean | null
        }
        Insert: {
          bank_linked?: boolean | null
          caste_category?: string | null
          created_at?: string
          data_usage_permission?: boolean | null
          date_of_birth?: string | null
          disability_percent?: number | null
          district?: string | null
          education?: string | null
          electricity_type?: string | null
          full_name: string
          gender?: string | null
          home_ownership?: string | null
          id?: string
          income?: number | null
          land_area?: number | null
          language_preference?: string | null
          mandal?: string | null
          minority?: boolean | null
          occupation?: string | null
          orphan_status?: boolean | null
          own_land?: boolean | null
          phone?: string | null
          profile_completed?: boolean | null
          ration_card_type?: string | null
          updated_at?: string
          user_id: string
          widow_status?: boolean | null
        }
        Update: {
          bank_linked?: boolean | null
          caste_category?: string | null
          created_at?: string
          data_usage_permission?: boolean | null
          date_of_birth?: string | null
          disability_percent?: number | null
          district?: string | null
          education?: string | null
          electricity_type?: string | null
          full_name?: string
          gender?: string | null
          home_ownership?: string | null
          id?: string
          income?: number | null
          land_area?: number | null
          language_preference?: string | null
          mandal?: string | null
          minority?: boolean | null
          occupation?: string | null
          orphan_status?: boolean | null
          own_land?: boolean | null
          phone?: string | null
          profile_completed?: boolean | null
          ration_card_type?: string | null
          updated_at?: string
          user_id?: string
          widow_status?: boolean | null
        }
        Relationships: []
      }
      scheme_matches: {
        Row: {
          id: string
          matched_at: string
          scheme_id: string
          status: string
          user_id: string
        }
        Insert: {
          id?: string
          matched_at?: string
          scheme_id: string
          status: string
          user_id: string
        }
        Update: {
          id?: string
          matched_at?: string
          scheme_id?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "scheme_matches_scheme_id_fkey"
            columns: ["scheme_id"]
            isOneToOne: false
            referencedRelation: "schemes"
            referencedColumns: ["id"]
          },
        ]
      }
      schemes: {
        Row: {
          active: boolean | null
          apply_url: string | null
          created_at: string
          description: string
          eligibility_rules: Json
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          active?: boolean | null
          apply_url?: string | null
          created_at?: string
          description: string
          eligibility_rules: Json
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          active?: boolean | null
          apply_url?: string | null
          created_at?: string
          description?: string
          eligibility_rules?: Json
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          district: string
          dob: string
          email: string
          full_name: string
          gender: string | null
          id: string
          language: string | null
          mandal: string
          phone: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          district: string
          dob: string
          email: string
          full_name: string
          gender?: string | null
          id: string
          language?: string | null
          mandal: string
          phone: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          district?: string
          dob?: string
          email?: string
          full_name?: string
          gender?: string | null
          id?: string
          language?: string | null
          mandal?: string
          phone?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
