# 技術仕様書 - 朝活管理アプリ

## 1. システム概要

### 1.1 アーキテクチャ概要
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   Database      │
│   (Vercel)      │───▶│   (Railway)     │───▶│  (Supabase)     │
│   Next.js       │    │   FastAPI       │    │  PostgreSQL     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                                              │
         └──────────────── Clerk Auth ─────────────────┘
```

### 1.2 技術スタック詳細

| レイヤー | 技術 | バージョン | 用途 |
|---------|------|-----------|------|
| フロントエンド | Next.js | 15.3.4 | React フレームワーク |
| | TypeScript | Latest | 型安全性確保 |
| | Tailwind CSS | Latest | スタイリング |
| | shadcn/ui | Latest | UIコンポーネント |
| バックエンド | FastAPI | Latest | API サーバー |
| | Python | 3.12+ | プログラミング言語 |
| | Uvicorn | Latest | ASGI サーバー |
| データベース | Supabase | Latest | PostgreSQL ホスティング |
| 認証 | Clerk | Latest | 認証・ユーザー管理 |
| デプロイ | Vercel | - | フロントエンドホスティング |
| | Railway | - | バックエンドホスティング |

## 2. 環境設定

### 2.1 環境変数

#### フロントエンド (.env.local)
```env
# Supabase (データベース操作用)
NEXT_PUBLIC_SUPABASE_URL=https://ufvjbfyuzxhtshbgntxy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# API接続
NEXT_PUBLIC_API_URL=http://localhost:8000

# Clerk認証
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_bGVhcm5pbmctZ2F6ZWxsZS01NS5jbGVyay5hY2NvdW50cy5kZXYk
CLERK_SECRET_KEY=sk_test_TewolIgpU4M8TTvccujmMOGKRmvcXz9Gw7ABBiiRqs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

#### バックエンド (.env)
```env
# Supabase
SUPABASE_URL=https://ufvjbfyuzxhtshbgntxy.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2.2 本番環境URL
- **フロントエンド**: https://[vercel-generated].vercel.app
- **バックエンド**: https://gcplatform6-production.up.railway.app
- **データベース**: https://ufvjbfyuzxhtshbgntxy.supabase.co

## 3. データベース設計

### 3.1 現在のスキーマ

#### test_table (テスト用)
```sql
CREATE TABLE test_table (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 3.2 今後実装予定のスキーマ
- [ ] users テーブル (Clerk連携)
- [ ] morning_activities テーブル
- [ ] activity_types テーブル
- [ ] user_goals テーブル

## 4. API仕様

### 4.1 現在実装済みエンドポイント

#### Base URL
- 開発: `http://localhost:8000`
- 本番: `https://gcplatform6-production.up.railway.app`

#### エンドポイント一覧

| メソッド | パス | 説明 | レスポンス例 |
|---------|------|------|-------------|
| GET | `/` | ヘルスチェック | `{"message": "Morning Activity API"}` |
| GET | `/api/test` | API接続確認 | `{"message": "API connection successful", "status": "ok"}` |
| GET | `/api/health` | DB接続確認 | `{"message": "Database connection successful", "status": "ok", "data": [...]}` |
| GET | `/api/test-data` | テストデータ取得 | `{"message": "Test data retrieved successfully", "data": [...]}` |
| POST | `/api/test-data` | テストデータ作成 | `{"message": "Test data created successfully", "data": [...]}` |

### 4.2 今後実装予定のエンドポイント
- [ ] `/api/auth/*` - 認証関連
- [ ] `/api/activities/*` - 朝活記録関連
- [ ] `/api/users/*` - ユーザー管理関連

## 5. フロントエンド設計

### 5.1 ディレクトリ構造
```
morning-activity-frontend/
├── src/
│   ├── app/
│   │   ├── page.tsx                 # メインページ
│   │   ├── layout.tsx               # レイアウト
│   │   ├── sign-in/[[...sign-in]]/  # ログインページ
│   │   └── sign-up/[[...sign-up]]/  # サインアップページ
│   ├── components/
│   │   └── ui/                      # shadcn/ui コンポーネント
│   ├── lib/
│   │   ├── supabase.ts             # Supabase クライアント
│   │   └── utils.ts                # ユーティリティ関数
│   └── middleware.ts               # Clerk ミドルウェア
├── .env.local                      # 環境変数
└── .env.example                    # 環境変数テンプレート
```

### 5.2 主要コンポーネント

#### 認証フロー
- `ClerkProvider` - 認証プロバイダー
- `SignInButton` - ログインボタン
- `UserButton` - ユーザーアバター
- `useUser` - ユーザー状態管理

#### UI コンポーネント (shadcn/ui)
- Button, Card, Input, Label
- Select, Textarea, Badge
- Avatar, Dropdown Menu

## 6. バックエンド設計

### 6.1 ディレクトリ構造
```
morning-activity-backend/
├── main.py              # FastAPI アプリケーション
├── requirements.txt     # 依存関係
├── railway.toml        # Railway 設定
├── Procfile           # プロセス定義
└── .env               # 環境変数
```

### 6.2 主要機能
- FastAPI アプリケーション
- CORS 設定
- Supabase クライアント統合
- エラーハンドリング
- 環境変数管理

## 7. デプロイメント

### 7.1 Vercel (フロントエンド)
- 自動デプロイ: GitHub main ブランチ
- 環境変数: Vercel Dashboard で設定
- ビルドコマンド: `npm run build`
- Root Directory: `morning-activity-frontend`

### 7.2 Railway (バックエンド)
- 自動デプロイ: GitHub main ブランチ
- 環境変数: Railway Dashboard で設定 (現在はコード内フォールバック)
- Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- Root Directory: `morning-activity-backend`

### 7.3 Supabase (データベース)
- PostgreSQL ホスティング
- 自動バックアップ
- GUI での管理

## 8. セキュリティ

### 8.1 認証・認可
- Clerk による OAuth 認証
- JWT トークンベース認証
- ルートレベルでの認証チェック

### 8.2 データ保護
- HTTPS 通信
- 環境変数による機密情報管理
- CORS 設定

## 9. モニタリング・ログ

### 9.1 ログ出力
- フロントエンド: ブラウザコンソール
- バックエンド: Railway ログ
- データベース: Supabase ダッシュボード

### 9.2 エラーハンドリング
- API エラーレスポンス
- フロントエンドでの try-catch
- ユーザーフレンドリーなエラー表示

## 10. 開発フロー

### 10.1 ローカル開発
```bash
# フロントエンド
cd morning-activity-frontend
npm run dev

# バックエンド
cd morning-activity-backend
source venv/bin/activate
uvicorn main:app --reload
```

### 10.2 デプロイフロー
1. 機能開発・テスト
2. Git コミット・プッシュ
3. 自動デプロイ (Vercel/Railway)
4. 本番環境テスト

## 11. 今後の拡張予定

### 11.1 技術的改善
- [ ] TypeScript 型定義の強化
- [ ] テストコードの追加
- [ ] CI/CD パイプラインの整備
- [ ] パフォーマンス最適化

### 11.2 機能拡張
- [ ] リアルタイム機能 (Supabase Realtime)
- [ ] プッシュ通知
- [ ] PWA 対応
- [ ] データ分析・可視化

---

*最終更新: 2025-06-19*
*バージョン: 1.0.0*