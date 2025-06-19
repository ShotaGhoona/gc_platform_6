# 開発ガイド - 朝活管理アプリ

## 1. 開発環境セットアップ

### 1.1 必要な環境
- Node.js 18+
- Python 3.12+
- Git

### 1.2 プロジェクトクローン
```bash
git clone https://github.com/ShotaGhoona/gc_platform_6.git
cd gc_platform_6
```

### 1.3 フロントエンド セットアップ
```bash
cd morning-activity-frontend

# 依存関係インストール
npm install

# 環境変数設定
cp .env.example .env.local
# .env.local を編集して実際の値を設定

# 開発サーバー起動
npm run dev
```

### 1.4 バックエンド セットアップ
```bash
cd morning-activity-backend

# 仮想環境作成
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 依存関係インストール
pip install -r requirements.txt

# 環境変数設定
cp .env.example .env  # 実際の値を設定

# 開発サーバー起動
uvicorn main:app --reload
```

## 2. 開発フロー

### 2.1 ブランチ戦略
- `main`: 本番環境用
- `develop`: 開発環境用 (今後作成予定)
- `feature/*`: 機能開発用ブランチ

### 2.2 コミット規約
```
<type>: <description>

<body>

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

**Type例:**
- `feat`: 新機能
- `fix`: バグ修正
- `docs`: ドキュメント更新
- `style`: コードスタイル変更
- `refactor`: リファクタリング
- `test`: テスト追加・修正

### 2.3 開発手順
1. Issue作成・確認
2. 機能ブランチ作成
3. 開発・テスト
4. コミット・プッシュ
5. プルリクエスト作成
6. レビュー・マージ

## 3. コーディング規約

### 3.1 TypeScript/React
- ESLint + Prettier 使用
- 関数コンポーネント推奨
- TypeScript strict モード
- カスタムフック活用

```typescript
// Good
interface UserProps {
  name: string
  email: string
}

const UserComponent: React.FC<UserProps> = ({ name, email }) => {
  return <div>{name} - {email}</div>
}
```

### 3.2 Python/FastAPI
- PEP 8 準拠
- Type hints 必須
- Docstrings 推奨

```python
# Good
async def get_user_data(user_id: int) -> Dict[str, Any]:
    """ユーザーデータを取得する
    
    Args:
        user_id: ユーザーID
        
    Returns:
        ユーザーデータ辞書
    """
    # 実装
```

## 4. テスト

### 4.1 フロントエンド
```bash
# 今後実装予定
npm run test
npm run test:e2e
```

### 4.2 バックエンド
```bash
# 今後実装予定
pytest
pytest --coverage
```

## 5. デバッグ・トラブルシューティング

### 5.1 よくある問題

#### フロントエンド
**問題**: 環境変数が読み込まれない
```bash
# 解決策
# 1. .env.local が正しく配置されているか確認
# 2. NEXT_PUBLIC_ プレフィックスが付いているか確認
# 3. サーバー再起動
npm run dev
```

**問題**: Clerk認証エラー
```bash
# 解決策
# 1. CLERK_PUBLISHABLE_KEY が正しく設定されているか確認
# 2. Clerkダッシュボードでドメイン設定確認
```

#### バックエンド
**問題**: Supabase接続エラー
```bash
# 解決策
# 1. SUPABASE_URL, SUPABASE_KEY が正しいか確認
# 2. Supabaseプロジェクトが有効か確認
```

**問題**: CORS エラー
```bash
# 解決策
# main.py の CORS 設定を確認
# フロントエンドのURLが許可されているか確認
```

### 5.2 ログ確認
```bash
# フロントエンド
# ブラウザの開発者ツール → Console

# バックエンド
# ターミナルのuvicornログを確認
```

## 6. パッケージ管理

### 6.1 新しい依存関係の追加

#### フロントエンド
```bash
# 本番依存関係
npm install package-name

# 開発依存関係
npm install -D package-name

# shadcn/ui コンポーネント
npx shadcn@latest add component-name
```

#### バックエンド
```bash
# 仮想環境アクティベート後
pip install package-name

# requirements.txt 更新
pip freeze > requirements.txt
```

### 6.2 更新
```bash
# フロントエンド
npm update

# バックエンド
pip install --upgrade package-name
```

## 7. データベース操作

### 7.1 Supabase SQL Editor
- https://supabase.com/dashboard → SQL Editor
- GUI での確認: Table Editor

### 7.2 マイグレーション
```sql
-- 新しいテーブル作成例
CREATE TABLE morning_activities (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  activity_type VARCHAR(100),
  duration INTEGER,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 8. デプロイ

### 8.1 自動デプロイ
- GitHub main ブランチにプッシュで自動デプロイ
- Vercel: フロントエンド
- Railway: バックエンド

### 8.2 手動デプロイ
```bash
# Vercel (フロントエンド)
npm run build  # ローカルビルドテスト

# Railway (バックエンド)
# Railway ダッシュボードから手動デプロイ可能
```

### 8.3 環境変数更新
1. **Vercel**: Dashboard → Settings → Environment Variables
2. **Railway**: Dashboard → Variables
3. 更新後は再デプロイが必要

## 9. パフォーマンス最適化

### 9.1 フロントエンド
- Next.js Image コンポーネント使用
- 動的インポート活用
- バンドルサイズ監視

### 9.2 バックエンド
- async/await 活用
- データベースクエリ最適化
- キャッシュ活用 (今後実装)

## 10. セキュリティ

### 10.1 環境変数管理
- `.env` ファイルは Git に含めない
- 本番環境では環境変数で設定
- 機密情報のハードコーディング禁止

### 10.2 入力値検証
- フロントエンド: フォームバリデーション
- バックエンド: Pydantic モデル使用

## 11. ドキュメント更新

### 11.1 更新すべきファイル
- `README.md`: プロジェクト概要
- `docs/PRD.md`: 要件変更時
- `docs/API_SPEC.md`: API変更時
- `docs/TECHNICAL_SPEC.md`: 技術変更時

### 11.2 コメント
- 複雑なロジックには必ずコメント
- TODO コメントで今後の改善点を記載

## 12. ツール・拡張機能

### 12.1 VS Code 推奨拡張機能
- TypeScript Importer
- Tailwind CSS IntelliSense
- Python
- Prettier
- ESLint

### 12.2 便利なコマンド
```bash
# Next.js
npm run lint       # リント実行
npm run build      # 本番ビルド

# Python
black .           # コードフォーマット (今後導入予定)
mypy .           # 型チェック (今後導入予定)
```

## 13. よくあるタスク

### 13.1 新しいページ追加
1. `src/app/` に新しいディレクトリ作成
2. `page.tsx` ファイル作成
3. 必要に応じてレイアウト調整

### 13.2 新しい API エンドポイント追加
1. `main.py` に新しいルート追加
2. `docs/API_SPEC.md` 更新
3. フロントエンドで API 呼び出し実装

### 13.3 shadcn/ui コンポーネント追加
```bash
npx shadcn@latest add button
npx shadcn@latest add card
```

---

*最終更新: 2025-06-19*
*作成者: Claude Code*