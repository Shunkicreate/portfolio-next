# ポートフォリオ改変 仕様メモ

最終更新 (2025‑05‑25) — コンテンツに公式 URL を追加し、既知の情報をできるだけ詳述。

## 1. 技術スタック / ビルド基盤

| 項目           | 採用技術                                              | メモ                                                                                       |
| -------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Framework      | Next.js (13 App Router)                               | 既存リポジトリに増築。app/ ディレクトリ運用。                                              |
| Styling        | Tailwind CSS v3 + @shadcn/ui                          | Radix UI ベースのプリミティブ。tailwind.config.ts にカスタムカラー・フォントトークン定義。 |
| Fonts          | Noto Serif JP / Zen Old Mincho / Inter                | next/font/local でサブセット化 → font-display: swap。                                      |
| Animation libs | • 純 CSS keyframes (Loading) • GSAP + Three.js (Hero) | GSAP は dynamic import、DrawSVGPlugin 同梱。                                               |
| Images         | next/image + AVIF + blurDataURL                       | Hero 画像は優先読み込み priority。                                                         |
| Content        | @next/mdx + contentlayer                              | Blog/Docs 用。Projects は 一覧カードのみ（詳細ページ不要）。                               |
| Testing / Lint | ESLint & Prettier (ローカル)                          | CI なし。手動実行。                                                                        |
| Deploy         | Vercel CD                                             | Preview URL を PR ごと自動生成。                                                           |

## 2. パフォーマンス指針

-   FCP を最優先。
-   クリティカル CSS（Tailwind JIT で削れたクラスのみ）＋ font‑preload。
-   Hero Section を SSR 配信し、Three.js は可視時に import()。

### Code‑splitting

-   GSAP, Three.js, react‑masonry‑css は dynamic() でクライアント側限定ロード。

### ローディング演出

-   SVG パス × stroke‑dashoffset で "shunki‑create" を手書き風描画（約 0 ~ 1.2 s）。
-   低通信環境では 0.8 s 以上の遅延があればスピナー fallback。
-   prefers‑reduced‑motion 対応は後工程。CSS media query でアニメ除去予定。

## 3. サイト情報構造

```
/
├─ about/        … 自己紹介・経歴・外部ブログ
├─ projects/     … 一覧カード (1ページ)
├─ gallery/      … Masonry 写真ギャラリー
└─ contact/      … メールリンク & SNS
```

### About (内容草案)

-   氏名: 田田 俊輝 (Shunki Tada)
-   学歴: 松山東高校 → 立命館大学 情報理工学部 卒
-   職歴: 株式会社 DeNA — Voice Pococha 開発担当
-   ブログ: Note / Qiita

## 4. Projects ― 一覧カード（トップ 5）

| Thumbnail | Title & Link                 | 技術スタック / ポイント                                                |
| --------- | ---------------------------- | ---------------------------------------------------------------------- |
|           | Water Canvas                 | Three.js × GLSL。水面シェーダで任意画像を水彩風に描写。                |
|           | 岡山大学医学部陸上部 公式 HP | Astro SSG → Next 13 へ移行予定。フォームに Elastic Email API。         |
|           | Banmeshi                     | Next.js / App Router・Firebase Auth。レコメンド API は Go Clean Arch。 |
|           | Web‑Maracas                  | PWA。Device Motion API でスマホを振って音を鳴らす。Latency < 50 ms。   |
|           | Voice Pococha                | DeNA ライブ配信サービス。Flutter Web SDK 組み込み PoC を担当。         |

🔗 Read More — Busdes!, Processing Mario, Dabemon GO などを折り畳み表示。

## 5. 主要 UI / アニメーション

### 5.1 Loading Screen

実装: `<LoadingLogo />` — inline SVG 内に 11 個の `<path>`。

CSS:

```css
@keyframes draw {
	to {
		stroke‑dashoffset: 0;
	}
}
path {
	stroke: #1a1a1a;
	stroke-width: 2;
	stroke-dasharray: var(--len);
	stroke-dashoffset: var(--len);
	animation: draw 1s ease forwards;
}
```

### 5.2 Hero Animation

```
<CanvasWrapper>
├─ Three.js Scene
│   └─ InstancedParticles (snow)
└─ GSAP timeline { fadeIn → camera dolly → snowLoop }
```

昼夜トグル: useTheme() で light / dark を検出 → uniforms.uColor 切替。

Fallback: prefers‑reduced‑motion or Mobile ≤ iPhone 11 → static JPEG + CSS snow.

## 6. Gallery

-   レイアウト: react-masonry-css
-   画像ソース: NAS (\raspberrypi\Main\Photos) → 事前に 1920 × auto でリサイズ、AVIF 化。
-   Lightbox: nextjs-simple-lightbox を dynamic import。

## 7. Contact

-   Mail: jmsrsyunrinsyunki@gmail.com
-   GitHub: Shunkicreate
-   Qiita: @Shunkicreate
-   Note: note.com/shunki_create
-   X (旧 Twitter): @shunki_create

## 8. CI / QA

-   CD: Vercel Auto Preview ＆ Production
-   Lint/Prettier: pnpm run lint / format をローカル実行。
-   ユニットテスト: 現状なし（必要に応じて Vitest を導入）。

## 今後の TODO

1. SVG ロゴのアウトラインデータ (logo.svg) を用意 → /public/ 配置。
2. Tailwind 基盤を既存リポに追加し、theme.ts にカラートークンを書く。
3. Hero Three.js シーンの PoC を別ブランチで作成。
4. Gallery 用画像のバッチ処理スクリプトを Node.js で用意（sharp）。
5. about/ ページの MDX 下書きを作成（学歴・職歴・ブログ執筆歴）。
