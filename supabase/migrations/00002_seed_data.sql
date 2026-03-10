-- Categories
insert into categories (name, slug, icon, display_order) values
  ('画像生成',     'image-generation',  'Image',       1),
  ('コーディング', 'coding',            'Code',        2),
  ('ライティング', 'writing',           'PenLine',     3),
  ('動画生成',     'video-generation',  'Video',       4),
  ('音楽生成',     'music-generation',  'Music',       5),
  ('チャットボット','chatbot',           'MessageCircle',6);

-- Tools
insert into tools (name, slug, description, logo_url, website_url, pricing_type, pricing_detail, use_cases, category_id, is_featured) values
  (
    'Midjourney',
    'midjourney',
    'テキストから高品質な画像を生成するAIツール。アート、デザイン、コンセプトアートに最適。',
    '/images/tools/midjourney.png',
    'https://www.midjourney.com',
    'paid',
    '月額$10〜',
    '{"コンセプトアート", "イラスト制作", "デザインモック"}',
    (select id from categories where slug = 'image-generation'),
    true
  ),
  (
    'DALL·E 3',
    'dall-e-3',
    'OpenAIが提供する画像生成AI。自然言語の指示に忠実な画像を生成。',
    '/images/tools/dalle.png',
    'https://openai.com/dall-e-3',
    'freemium',
    'ChatGPT Plus内で利用可能',
    '{"SNS用画像", "プレゼン資料", "ブログ挿絵"}',
    (select id from categories where slug = 'image-generation'),
    false
  ),
  (
    'GitHub Copilot',
    'github-copilot',
    'AIがコードを自動補完・提案。VS Code等のエディタと統合して開発効率を大幅向上。',
    '/images/tools/copilot.png',
    'https://github.com/features/copilot',
    'freemium',
    '個人は月額$10、無料枠あり',
    '{"コード補完", "テスト生成", "リファクタリング"}',
    (select id from categories where slug = 'coding'),
    true
  ),
  (
    'Cursor',
    'cursor',
    'AI搭載のコードエディタ。チャットでコード生成や修正が可能。VS Codeベース。',
    '/images/tools/cursor.png',
    'https://cursor.sh',
    'freemium',
    '無料枠あり、Proは月額$20',
    '{"AI駆動開発", "コードレビュー", "デバッグ支援"}',
    (select id from categories where slug = 'coding'),
    true
  ),
  (
    'Claude',
    'claude',
    'Anthropic開発の対話型AI。長文理解、コーディング、分析に優れる。',
    '/images/tools/claude.png',
    'https://claude.ai',
    'freemium',
    '無料枠あり、Proは月額$20',
    '{"文章作成", "コード生成", "データ分析"}',
    (select id from categories where slug = 'chatbot'),
    true
  ),
  (
    'ChatGPT',
    'chatgpt',
    'OpenAIの対話型AI。幅広いタスクに対応し、プラグインやGPTsで拡張可能。',
    '/images/tools/chatgpt.png',
    'https://chat.openai.com',
    'freemium',
    '無料枠あり、Plusは月額$20',
    '{"質問応答", "文章校正", "アイデア出し"}',
    (select id from categories where slug = 'chatbot'),
    false
  ),
  (
    'Jasper',
    'jasper',
    'マーケティング向けAIライティングツール。ブログ、広告、SNS投稿を効率的に作成。',
    '/images/tools/jasper.png',
    'https://www.jasper.ai',
    'paid',
    '月額$49〜',
    '{"ブログ記事", "広告コピー", "SNS投稿"}',
    (select id from categories where slug = 'writing'),
    false
  ),
  (
    'Notion AI',
    'notion-ai',
    'Notionに統合されたAIアシスタント。文章の要約、翻訳、ブレストが可能。',
    '/images/tools/notion-ai.png',
    'https://www.notion.so/product/ai',
    'freemium',
    'Notion有料プランに追加$10/月',
    '{"議事録要約", "翻訳", "ブレインストーミング"}',
    (select id from categories where slug = 'writing'),
    false
  ),
  (
    'Runway',
    'runway',
    'AIによる動画生成・編集ツール。テキストや画像から動画を生成。映像クリエイター向け。',
    '/images/tools/runway.png',
    'https://runwayml.com',
    'freemium',
    '無料枠あり、Proは月額$12〜',
    '{"動画生成", "動画編集", "VFX制作"}',
    (select id from categories where slug = 'video-generation'),
    true
  ),
  (
    'Suno',
    'suno',
    'テキストから楽曲を生成するAI。歌詞・メロディ・伴奏を自動作成。',
    '/images/tools/suno.png',
    'https://suno.com',
    'freemium',
    '無料枠あり、Proは月額$10',
    '{"楽曲制作", "BGM作成", "デモ音源"}',
    (select id from categories where slug = 'music-generation'),
    false
  );
