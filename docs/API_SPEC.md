# API仕様書 - 朝活管理アプリ

## 1. 概要

### 1.1 Base URL
- **開発環境**: `http://localhost:8000`
- **本番環境**: `https://gcplatform6-production.up.railway.app`

### 1.2 認証
- **認証方式**: Clerk JWT トークン
- **ヘッダー**: `Authorization: Bearer <token>`

### 1.3 レスポンス形式
- **Content-Type**: `application/json`
- **文字エンコーディング**: UTF-8

## 2. 現在実装済みエンドポイント

### 2.1 ヘルスチェック

#### `GET /`
アプリケーションの基本動作確認

**レスポンス**
```json
{
  "message": "Morning Activity API"
}
```

**ステータスコード**
- `200`: 正常

---

### 2.2 API接続確認

#### `GET /api/test`
API サーバーの動作確認

**レスポンス**
```json
{
  "message": "API connection successful",
  "status": "ok"
}
```

**ステータスコード**
- `200`: 正常

---

### 2.3 データベース接続確認

#### `GET /api/health`
データベース接続とテストデータの存在確認

**レスポンス**
```json
{
  "message": "Database connection successful",
  "status": "ok",
  "data": [
    {
      "id": 1,
      "name": "テストユーザー1",
      "email": "test1@example.com",
      "created_at": "2025-06-19T08:48:53.700539"
    }
  ]
}
```

**エラーレスポンス**
```json
{
  "message": "Database connection failed",
  "status": "error",
  "error": "エラーメッセージ"
}
```

**ステータスコード**
- `200`: 正常
- `500`: データベース接続エラー

---

### 2.4 テストデータ取得

#### `GET /api/test-data`
すべてのテストデータを取得

**レスポンス**
```json
{
  "message": "Test data retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "テストユーザー1",
      "email": "test1@example.com",
      "created_at": "2025-06-19T08:48:53.700539"
    },
    {
      "id": 2,
      "name": "テストユーザー2",
      "email": "test2@example.com",
      "created_at": "2025-06-19T08:48:53.700539"
    }
  ]
}
```

**エラーレスポンス**
```json
{
  "message": "Failed to retrieve test data",
  "error": "エラーメッセージ"
}
```

**ステータスコード**
- `200`: 正常
- `500`: データ取得エラー

---

### 2.5 テストデータ作成

#### `POST /api/test-data`
新しいテストデータを作成

**リクエストパラメータ**
| パラメータ | 型 | 必須 | 説明 |
|----------|---|------|------|
| name | string | ✓ | ユーザー名 |
| email | string | ✓ | メールアドレス |

**リクエスト例**
```
POST /api/test-data?name=新規ユーザー&email=new@example.com
```

**レスポンス**
```json
{
  "message": "Test data created successfully",
  "data": [
    {
      "id": 3,
      "name": "新規ユーザー",
      "email": "new@example.com",
      "created_at": "2025-06-19T09:00:00.000000"
    }
  ]
}
```

**エラーレスポンス**
```json
{
  "message": "Failed to create test data",
  "error": "エラーメッセージ"
}
```

**ステータスコード**
- `200`: 正常
- `400`: パラメータエラー
- `500`: データ作成エラー

## 3. 今後実装予定のエンドポイント

### 3.1 認証関連
- [ ] `POST /api/auth/webhook` - Clerk Webhook処理
- [ ] `GET /api/auth/user` - ユーザー情報取得

### 3.2 朝活記録関連
- [ ] `GET /api/activities` - 朝活記録一覧取得
- [ ] `POST /api/activities` - 朝活記録作成
- [ ] `PUT /api/activities/{id}` - 朝活記録更新
- [ ] `DELETE /api/activities/{id}` - 朝活記録削除
- [ ] `GET /api/activities/stats` - 朝活統計データ取得

### 3.3 ユーザー管理関連
- [ ] `GET /api/users/profile` - ユーザープロフィール取得
- [ ] `PUT /api/users/profile` - ユーザープロフィール更新
- [ ] `GET /api/users/settings` - ユーザー設定取得
- [ ] `PUT /api/users/settings` - ユーザー設定更新

### 3.4 目標管理関連
- [ ] `GET /api/goals` - 目標一覧取得
- [ ] `POST /api/goals` - 目標作成
- [ ] `PUT /api/goals/{id}` - 目標更新
- [ ] `DELETE /api/goals/{id}` - 目標削除

## 4. エラーハンドリング

### 4.1 エラーレスポンス形式
```json
{
  "message": "エラーの説明",
  "error": "詳細なエラーメッセージ",
  "status": "error"
}
```

### 4.2 HTTPステータスコード
| コード | 説明 |
|-------|------|
| 200 | 成功 |
| 400 | リクエストエラー (パラメータ不正等) |
| 401 | 認証エラー |
| 403 | 認可エラー |
| 404 | リソースが見つからない |
| 500 | サーバー内部エラー |

## 5. CORS設定

### 5.1 許可オリジン
- `http://localhost:3000` (開発環境)
- `https://vercel.app` (本番環境)
- `*` (一時的な設定)

### 5.2 許可メソッド
- `GET`, `POST`, `PUT`, `DELETE`, `OPTIONS`

### 5.3 許可ヘッダー
- すべてのヘッダーを許可

## 6. レート制限

### 6.1 現在の制限
- 制限なし (今後実装予定)

### 6.2 今後の実装予定
- [ ] IP ベースのレート制限
- [ ] ユーザーベースのレート制限
- [ ] API キーベースの制限

## 7. ログ・モニタリング

### 7.1 ログ出力
- すべてのAPIリクエスト/レスポンスをログ出力
- エラー発生時の詳細ログ

### 7.2 メトリクス
- レスポンス時間
- エラー率
- リクエスト数

## 8. セキュリティ

### 8.1 入力値検証
- SQLインジェクション対策
- XSS対策
- パラメータバリデーション

### 8.2 データ保護
- 機密データのマスキング
- ログでの個人情報除外

## 9. テスト

### 9.1 テスト用エンドポイント
現在実装済みのエンドポイントはすべてテスト用途も兼ねています。

### 9.2 テストデータ
```sql
INSERT INTO test_table (name, email) VALUES 
('テストユーザー1', 'test1@example.com'),
('テストユーザー2', 'test2@example.com');
```

## 10. バージョニング

### 10.1 現在のバージョン
- v1.0 (URL パスにバージョンなし)

### 10.2 今後のバージョニング戦略
- [ ] `/api/v1/` 形式でのバージョニング
- [ ] 後方互換性の維持

---

*最終更新: 2025-06-19*
*バージョン: 1.0.0*