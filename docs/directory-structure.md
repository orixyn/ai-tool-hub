# ディレクトリ構成

```
ai-tool-hub/
├── public/
│   └── images/              # ロゴ等の静的画像
├── src/
│   ├── app/
│   │   ├── layout.tsx              # ルートレイアウト（ClerkProvider）
│   │   ├── page.tsx                # トップページ
│   │   ├── tools/
│   │   │   ├── page.tsx            # ツール一覧（検索・カテゴリフィルタ）
│   │   │   └── [slug]/
│   │   │       └── page.tsx        # ツール詳細
│   │   ├── dashboard/
│   │   │   ├── layout.tsx          # 認証ガード付きレイアウト
│   │   │   ├── page.tsx            # ダッシュボード概要
│   │   │   ├── favorites/
│   │   │   │   └── page.tsx        # お気に入り一覧
│   │   │   └── bookmarks/
│   │   │       └── page.tsx        # ブックマーク&ToDo
│   │   ├── sign-in/
│   │   │   └── [[...sign-in]]/
│   │   │       └── page.tsx        # Clerk Sign In
│   │   └── sign-up/
│   │       └── [[...sign-up]]/
│   │           └── page.tsx        # Clerk Sign Up
│   ├── components/
│   │   ├── layout/
│   │   │   ├── header.tsx          # ヘッダー（ナビ・認証ボタン）
│   │   │   └── footer.tsx          # フッター
│   │   ├── tools/
│   │   │   ├── tool-card.tsx       # ツールカード（一覧用）
│   │   │   ├── tool-grid.tsx       # ツールグリッド表示
│   │   │   ├── category-filter.tsx # カテゴリフィルター
│   │   │   └── search-bar.tsx      # 検索バー
│   │   ├── favorites/
│   │   │   └── favorite-button.tsx # お気に入りボタン
│   │   └── bookmarks/
│   │       ├── bookmark-button.tsx # ブックマークボタン
│   │       ├── bookmark-list.tsx   # ブックマーク一覧
│   │       └── bookmark-item.tsx   # ブックマーク項目（ToDo機能付き）
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts           # Supabaseクライアント初期化
│   │   │   ├── server.ts           # サーバー用クライアント
│   │   │   └── types.ts            # DB型定義（自動生成）
│   │   └── constants.ts            # カテゴリ定義など
│   ├── actions/
│   │   ├── favorites.ts            # お気に入りCRUD（Server Actions）
│   │   └── bookmarks.ts            # ブックマークCRUD（Server Actions）
│   └── middleware.ts               # Clerk認証ミドルウェア
├── supabase/
│   └── migrations/                 # マイグレーションSQL
├── .env.local                      # 環境変数
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
└── package.json
```

## 構成のポイント

- **App Router準拠**: `src/app/` 配下にページを配置
- **Server Actions**: `src/actions/` でお気に入り・ブックマークのCRUDを処理
- **Supabase**: `src/lib/supabase/` にクライアント初期化を集約（client/server分離）
- **コンポーネント**: 機能単位でフォルダ分け（tools, favorites, bookmarks）
- **Clerk認証**: `dashboard/layout.tsx` で認証ガード、`middleware.ts` でルート保護
