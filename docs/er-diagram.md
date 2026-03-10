# ER図（データベース設計）

```mermaid
erDiagram
    categories {
        uuid id PK
        text name
        text slug UK
        text icon
        int display_order
        timestamptz created_at
    }

    tools {
        uuid id PK
        text name
        text slug UK
        text description
        text logo_url
        text website_url
        text pricing_type "free | freemium | paid | enterprise"
        text pricing_detail
        text_array use_cases
        uuid category_id FK
        boolean is_featured
        timestamptz created_at
        timestamptz updated_at
    }

    favorites {
        uuid id PK
        text user_id FK "Clerk user ID"
        uuid tool_id FK
        timestamptz created_at
    }

    bookmarks {
        uuid id PK
        text user_id FK "Clerk user ID"
        uuid tool_id FK
        text memo "メモ / やること"
        boolean is_done "ToDo完了フラグ"
        timestamptz due_date "期日（任意）"
        timestamptz created_at
        timestamptz updated_at
    }

    categories ||--o{ tools : "has many"
    tools ||--o{ favorites : "has many"
    tools ||--o{ bookmarks : "has many"
```

## テーブル補足

- **ユーザーテーブルは作らない**: Clerkが管理。`user_id`にClerkのuser IDを保存
- **favorites**: `user_id + tool_id` にユニーク制約（同じツールを重複登録させない）
- **bookmarks**: `memo`にToDo内容（例:「次の休日にCLAUDE.md設定を試す」）、`is_done`で完了管理
- **tools.pricing_type**: 4種（free / freemium / paid / enterprise）で絞り込み可能
