export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          icon: string;
          display_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          icon: string;
          display_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          icon?: string;
          display_order?: number;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "tools_category_id_fkey";
            columns: ["id"];
            isOneToOne: false;
            referencedRelation: "tools";
            referencedColumns: ["category_id"];
          },
        ];
      };
      tools: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string;
          logo_url: string;
          website_url: string;
          pricing_type: "free" | "freemium" | "paid" | "enterprise";
          pricing_detail: string | null;
          use_cases: string[];
          category_id: string;
          is_featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description: string;
          logo_url: string;
          website_url: string;
          pricing_type: "free" | "freemium" | "paid" | "enterprise";
          pricing_detail?: string | null;
          use_cases?: string[];
          category_id: string;
          is_featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string;
          logo_url?: string;
          website_url?: string;
          pricing_type?: "free" | "freemium" | "paid" | "enterprise";
          pricing_detail?: string | null;
          use_cases?: string[];
          category_id?: string;
          is_featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "tools_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
        ];
      };
      favorites: {
        Row: {
          id: string;
          user_id: string;
          tool_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          tool_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          tool_id?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "favorites_tool_id_fkey";
            columns: ["tool_id"];
            isOneToOne: false;
            referencedRelation: "tools";
            referencedColumns: ["id"];
          },
        ];
      };
      bookmarks: {
        Row: {
          id: string;
          user_id: string;
          tool_id: string;
          memo: string | null;
          is_done: boolean;
          due_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          tool_id: string;
          memo?: string | null;
          is_done?: boolean;
          due_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          tool_id?: string;
          memo?: string | null;
          is_done?: boolean;
          due_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "bookmarks_tool_id_fkey";
            columns: ["tool_id"];
            isOneToOne: false;
            referencedRelation: "tools";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
