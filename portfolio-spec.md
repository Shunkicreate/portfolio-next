# Portfolio Specification

## トップページ

### 1. Hero セクション（Three.js 砂丘＋雪アニメーション）

-   **ダークモード時**
    -   夜の砂丘（暗い砂丘＋星空）を背景に、雪が降るアニメーション
    -   キャッチコピー・名前・簡単な肩書き（例「Shunki Create」）
    -   "About へ" ボタン（またはスクロールインジケーター）
-   **ライトテーマ時**
    -   青空の砂丘（明るい砂丘＋青空）を背景に、雪が地面で溶けるアニメーション
    -   キャッチコピー・名前・簡単な肩書き（例「Shunki Create」）
    -   "About へ" ボタン（またはスクロールインジケーター）
-   **技術要件**
    -   react-three-fiber（Three.js）で砂丘（地形）＋パーティクル（雪）を描画
    -   テーマ（ダーク・ライト）に応じて背景色・パーティクル挙動を切り替え
    -   パフォーマンス・FCP 改善のため、Suspense（遅延ロード）を活用
    -   モバイル対応（軽量・低負荷）
    -   アクセシビリティ（canvas の下にテキストも配置）

### 2. About Preview（小出し）

-   About ページの要約（自己紹介の一文）＋写真 or アイコン
-   "もっと見る" または "About へ" ボタンで本ページへ遷移
