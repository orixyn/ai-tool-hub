# 画面遷移図

```mermaid
graph TD
    A[トップページ<br/>/] --> B[ツール一覧<br/>/tools]
    A --> C[ログイン<br/>/sign-in]
    A --> D[新規登録<br/>/sign-up]

    B --> E[カテゴリ別一覧<br/>/tools?category=xxx]
    B --> F[ツール詳細<br/>/tools/:slug]
    E --> F

    F --> G{ログイン済み?}
    G -->|Yes| H[お気に入り追加]
    G -->|Yes| I[ブックマーク追加]
    G -->|No| C

    C --> J[ダッシュボード<br/>/dashboard]
    D --> J

    J --> K[お気に入り一覧<br/>/dashboard/favorites]
    J --> L[ブックマーク&ToDo<br/>/dashboard/bookmarks]

    K --> F
    L --> F

    A --> M[検索結果<br/>/tools?q=xxx]
    M --> F

    style A fill:#4F46E5,color:#fff
    style J fill:#059669,color:#fff
    style C fill:#D97706,color:#fff
    style D fill:#D97706,color:#fff
```

## 画面一覧

| # | 画面名 | パス | 認証 | 説明 |
|---|--------|------|------|------|
| 1 | トップページ | `/` | 不要 | ヒーロー + 人気ツール + カテゴリ一覧 |
| 2 | ツール一覧 | `/tools` | 不要 | 全ツール一覧（カテゴリフィルタ・検索対応） |
| 3 | ツール詳細 | `/tools/[slug]` | 不要 | 概要・料金・用途・お気に入りボタン |
| 4 | ログイン | `/sign-in` | - | Clerk提供 |
| 5 | 新規登録 | `/sign-up` | - | Clerk提供 |
| 6 | ダッシュボード | `/dashboard` | 必要 | ユーザーのお気に入り・ブックマーク概要 |
| 7 | お気に入り一覧 | `/dashboard/favorites` | 必要 | お気に入り登録したツール一覧 |
| 8 | ブックマーク&ToDo | `/dashboard/bookmarks` | 必要 | ブックマーク + メモ付きToDoリスト |
