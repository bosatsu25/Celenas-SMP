# Celenas SMP

Minecraft コミュニティサイトのフロントエンド基盤です。Phase 1 は最小限の
案内ページと再現可能な開発・検証環境を提供します。

## 開発

Node.js 24 と pnpm 11.25.0 を使用します。

```sh
pnpm install --frozen-lockfile
pnpm dev
```

ローカル画面は [localhost:3000](http://localhost:3000) で開きます。
環境変数や認証情報は不要です。Next.js のテレメトリはプロジェクトの実行
スクリプトで無効化しています。

## 検証

```sh
pnpm exec playwright install chromium
pnpm check
```

`check` は整形、lint、型チェック、ユニットテスト、本番ビルド、Playwright を
順に実行します。ブラウザテストはポート 3100 に専用の本番サーバーを起動します。
Windows のブラウザ導入コマンドなど、詳細は [テスト手順](docs/testing.md) を参照してください。

## 構成

- Next.js App Router / React / strict TypeScript
- CSS Custom Properties によるデザイントークン
- Vitest / React Testing Library / Playwright / axe
- ESLint / Prettier / GitHub Actions

参加情報は `src/config/site.ts` で管理します。未確定値は `null` のまま表示され、
架空のアドレス・バージョン・Discord URL は使用しません。確認済みの公開情報を
設定した後、再ビルドしてください。ここに秘密情報を置かないでください。

## ドキュメント

- [アーキテクチャと依存関係の判断](docs/architecture.md)
- [デザイン基盤](docs/design-system.md)
- [テスト](docs/testing.md)
- [品質ゲート](docs/quality-gates.md)
- [Phase 1 計画・実行記録](docs/phase-1-plan.md)
- [エージェント向け作業ルール](AGENTS.md)

## Phase 2

正式ロゴ、確認済みの参加情報、Minecraft の画像、サイト全体のコンテンツ、
Liquid Glass の詳細な表現・操作設計は次フェーズで扱います。現在はテキストの
ブランド表示のみで、外部 API、アクセス解析、サーバー監視は導入していません。
