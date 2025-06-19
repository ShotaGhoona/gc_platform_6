# 朝活管理アプリ

朝活の状況を管理するWebアプリケーション

## 技術スタック

### フロントエンド
- Next.js 15
- TypeScript
- Tailwind CSS
- shadcn/ui

### バックエンド
- FastAPI
- Python

### データベース・認証
- Supabase
- Supabase Auth (Google OAuth)

### デプロイ
- Vercel (フロントエンド)
- Railway (バックエンド)

## プロジェクト構成

```
gc_platform_6/
├── morning-activity-frontend/  # Next.jsフロントエンド
└── morning-activity-backend/   # FastAPIバックエンド
```

## 開発環境

### フロントエンド
```bash
cd morning-activity-frontend
npm install
npm run dev
```

### バックエンド
```bash
cd morning-activity-backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

## 環境変数

### フロントエンド (.env.local)
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### バックエンド (.env)
```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_service_key
```