# 朝活管理アプリ

朝活の状況を管理し、継続的な朝活習慣の形成をサポートするWebアプリケーション

## 📋 現在の状況

- ✅ **Phase 1 完了**: 基盤構築・認証システム・API接続
- 🔄 **Phase 2 進行中**: 要件定義・朝活機能設計
- 📝 **最新デプロイ**: [Vercel](https://gc-platform-6.vercel.app/) | [Railway API](https://gcplatform6-production.up.railway.app/)

## 🛠 技術スタック

### フロントエンド
- **Next.js** 15.3.4 - React フレームワーク
- **TypeScript** - 型安全性
- **Tailwind CSS** - スタイリング
- **shadcn/ui** - UIコンポーネントライブラリ
- **Clerk** - 認証・ユーザー管理

### バックエンド
- **FastAPI** - Python API フレームワーク
- **Uvicorn** - ASGI サーバー
- **Supabase Python Client** - データベース操作

### インフラ・サービス
- **Supabase** - PostgreSQL データベース
- **Vercel** - フロントエンドホスティング
- **Railway** - バックエンドホスティング
- **GitHub** - ソースコード管理

## 📁 プロジェクト構成

```
gc_platform_6/
├── morning-activity-frontend/    # Next.js フロントエンド
│   ├── src/
│   │   ├── app/                 # App Router ページ
│   │   ├── components/ui/       # shadcn/ui コンポーネント
│   │   └── lib/                 # ユーティリティ・設定
│   ├── .env.local              # 環境変数 (ローカル)
│   └── .env.example            # 環境変数テンプレート
├── morning-activity-backend/     # FastAPI バックエンド
│   ├── main.py                 # FastAPI アプリケーション
│   ├── requirements.txt        # Python 依存関係
│   └── .env                    # 環境変数
├── docs/                        # プロジェクトドキュメント
│   ├── PRD.md                  # プロダクト要件定義書
│   ├── TECHNICAL_SPEC.md       # 技術仕様書
│   ├── API_SPEC.md             # API 仕様書
│   └── DEVELOPMENT_GUIDE.md    # 開発ガイド
└── README.md                    # このファイル
```

## 🚀 クイックスタート

### 1. プロジェクトクローン
```bash
git clone https://github.com/ShotaGhoona/gc_platform_6.git
cd gc_platform_6
```

### 2. フロントエンド セットアップ
```bash
cd morning-activity-frontend

# 依存関係インストール
npm install

# 環境変数設定
cp .env.example .env.local
# .env.local を編集

# 開発サーバー起動
npm run dev
```
→ http://localhost:3001 でアクセス

### 3. バックエンド セットアップ
```bash
cd morning-activity-backend

# 仮想環境作成・アクティベート
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 依存関係インストール
pip install -r requirements.txt

# 開発サーバー起動
uvicorn main:app --reload
```
→ http://localhost:8000 でアクセス

## 🔧 環境変数設定

### フロントエンド (.env.local)
```env
# Supabase (データベース接続用)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# API接続
NEXT_PUBLIC_API_URL=http://localhost:8000

# Clerk認証
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

### バックエンド (.env)
```env
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_service_role_key
```

## ✨ 実装済み機能

### 🔐 認証システム
- ✅ Clerk による Google OAuth 認証
- ✅ ユーザープロフィール表示
- ✅ 保護されたルート

### 🔌 API・データベース接続
- ✅ FastAPI バックエンド
- ✅ Supabase PostgreSQL 連携
- ✅ CORS 設定
- ✅ エラーハンドリング

### 🎨 UI・UX
- ✅ shadcn/ui コンポーネント統合
- ✅ レスポンシブデザイン
- ✅ ダークモード対応準備
- ✅ モダンなユーザーインターフェース

### 🌐 デプロイメント
- ✅ Vercel 自動デプロイ
- ✅ Railway 自動デプロイ
- ✅ 環境変数管理
- ✅ 本番環境での動作確認

## 📊 API エンドポイント

| エンドポイント | メソッド | 説明 | ステータス |
|-------------|---------|------|--------|
| `/` | GET | API ヘルスチェック | ✅ |
| `/api/test` | GET | 接続確認 | ✅ |
| `/api/health` | GET | DB接続確認 | ✅ |
| `/api/test-data` | GET | テストデータ取得 | ✅ |
| `/api/test-data` | POST | テストデータ作成 | ✅ |

詳細は [API仕様書](docs/API_SPEC.md) を参照

## 🧪 テスト

### API テスト
```bash
# ヘルスチェック
curl https://gcplatform6-production.up.railway.app/api/health

# テストデータ取得
curl https://gcplatform6-production.up.railway.app/api/test-data
```

### フロントエンド
1. https://gc-platform-6.vercel.app/ にアクセス
2. Clerk認証でログイン
3. 「テストデータを取得」ボタンでAPI連携確認

## 📈 開発ロードマップ

### Phase 1: 基盤構築 ✅
- [x] 技術スタック構築
- [x] 認証システム (Clerk)
- [x] API・DB連携
- [x] CI/CD パイプライン

### Phase 2: 要件定義・設計 🔄
- [ ] 朝活機能の詳細要件定義
- [ ] データベース設計
- [ ] UI/UX 設計
- [ ] API 設計

### Phase 3: 朝活管理機能開発
- [ ] 朝活記録機能
- [ ] データ可視化
- [ ] 目標設定・追跡
- [ ] 通知機能

### Phase 4: 機能拡張
- [ ] コミュニティ機能
- [ ] データ分析
- [ ] モバイル対応
- [ ] パフォーマンス最適化

## 🤝 開発フロー

### ブランチ戦略
- `main`: 本番環境 (安定版)
- `develop`: 開発環境 (統合ブランチ)
- `feature/*`: 機能開発ブランチ

### コントリビューション
1. `develop` ブランチから機能ブランチを作成
2. 開発・テスト
3. `develop` にプルリクエスト
4. レビュー後マージ
5. 定期的に `main` にマージ

詳細は [開発ガイド](docs/DEVELOPMENT_GUIDE.md) を参照

## 📚 ドキュメント

| ドキュメント | 説明 |
|-------------|------|
| [PRD.md](docs/PRD.md) | プロダクト要件定義書 |
| [TECHNICAL_SPEC.md](docs/TECHNICAL_SPEC.md) | 技術仕様書 |
| [API_SPEC.md](docs/API_SPEC.md) | API 仕様書 |
| [DEVELOPMENT_GUIDE.md](docs/DEVELOPMENT_GUIDE.md) | 開発ガイド |

## 🔗 リンク

- **本番環境**: https://gc-platform-6.vercel.app/
- **API サーバー**: https://gcplatform6-production.up.railway.app/
- **リポジトリ**: https://github.com/ShotaGhoona/gc_platform_6
- **API ドキュメント**: https://gcplatform6-production.up.railway.app/docs

## 📝 ライセンス

このプロジェクトは開発学習目的で作成されています。

---

*最終更新: 2025-06-19*  
*バージョン: 1.0.0*  
*ステータス: Phase 1 完了、Phase 2 進行中*