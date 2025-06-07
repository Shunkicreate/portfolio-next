# Portfolio Implementation Plan

## Current State Analysis
- Next.js 13.4.2 project with TypeScript
- Tailwind CSS already installed
- Basic project structure exists (pages/ directory)
- Using npm (needs to be migrated to pnpm)

## Phase 1: Project Setup & Migration
- [ ] pnpmへの移行
  - [ ] pnpmのインストール
  - [ ] package-lock.jsonの削除
  - [ ] pnpm-lock.yamlの生成
  - [ ] 依存関係の再インストール
- [ ] App Routerへの移行
  - [ ] app/ディレクトリの作成
  - [ ] 既存のpages/コンポーネントの移行
  - [ ] ルーティングの更新
- [ ] ローカルフォントの設定
  - [ ] Noto Serif JP
  - [ ] Zen Old Mincho
  - [ ] Inter
- [ ] Tailwindテーマの設定
  - [ ] カラーパレットの定義
  - [ ] ダークモードの設定

## Phase 2: コアコンポーネント
- [ ] LoadingLogoコンポーネント
  - [ ] SVGアニメーションの実装
  - [ ] CSSアニメーションの最適化
- [ ] HeroCanvasコンポーネント
  - [ ] Three.jsとGSAPの実装
  - [ ] 動的インポートの設定
  - [ ] フォールバックの実装
- [ ] ナビゲーションコンポーネント
  - [ ] デスクトップレイアウト
  - [ ] モバイル対応メニュー
  - [ ] ダークモードトグル

## Phase 3: ページ実装
- [ ] プロジェクトページ
  - [ ] ProjectCardコンポーネント
  - [ ] プロジェクトデータ構造の実装
  - [ ] グリッドレイアウト
  - [ ] "Read more"セクション
- [ ] ギャラリーページ
  - [ ] react-masonry-cssの実装
  - [ ] next/imageの最適化
  - [ ] ライトボックス機能
- [ ] Aboutページ
  - [ ] プロフィールセクション
  - [ ] 学歴・職歴タイムライン
  - [ ] ブログリンク
- [ ] コンタクトページ
  - [ ] メールリンク
  - [ ] SNSアイコン（lucide-react）

## Phase 4: パフォーマンス最適化
- [ ] フォント最適化（next/font）
- [ ] 動的インポートの実装
- [ ] 画像最適化（AVIF + JPG）
- [ ] Lighthouse監査
- [ ] レスポンシブデザインのテスト
- [ ] ダークモードの動作確認

## Phase 5: ドキュメントとデプロイ
- [ ] README.mdの更新
- [ ] コンポーネントの使用ドキュメント
- [ ] Vercelデプロイの確認
- [ ] 最終パフォーマンスチェック

## 追加する依存関係
```json
{
  "dependencies": {
    "gsap": "latest",
    "lucide-react": "latest",
    "nextjs-simple-lightbox": "latest",
    "react-masonry-css": "latest",
    "three": "latest"
  }
}
```

## ファイル構造
```
app/
├── layout.tsx
├── page.tsx
├── about/
│   └── page.tsx
├── projects/
│   └── page.tsx
├── gallery/
│   └── page.tsx
└── contact/
    └── page.tsx

components/
├── LoadingLogo.tsx
├── HeroCanvas.tsx
├── Navigation.tsx
├── ProjectCard.tsx
└── Gallery.tsx

lib/
├── fonts.ts
└── utils.ts

public/
├── fonts/
├── gallery/
└── logo.svg

styles/
└── globals.css
```

## 注意事項
- すべてのコンポーネントはTypeScriptで実装
- コンポーネント固有のスタイルはCSS Modulesを使用
- エラーバウンダリの実装
- 動的インポートのローディング状態
- SEOメタデータの最適化
- アクセシビリティ対応
- 既存のJSONデータは段階的に移行 