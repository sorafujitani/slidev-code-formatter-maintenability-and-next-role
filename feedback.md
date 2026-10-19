template repo に汎用的に取り込めそうな変更を、スライド固有部分（`slides.md` / `note.md` / `index.html` のメタ / OGP画像 / `CLAUDE.md`のセクション構成 / `prettier-repo`参照ガイド）を除外して整理しました。

---

## 1. `setup/shiki.ts` (新規) — シンタックスハイライトのカスタムテーマ

`style.css` 内の `.shiki span[style*="..."]` を上書きするハック (約60行) を全削除して、Shiki公式の API でカスタムテーマを定義する方式に切り替えています。これは template に取り込む価値が大きい部分です。

```ts
// setup/shiki.ts
import { defineShikiSetup } from '@slidev/types'
import type { ThemeRegistrationRaw } from 'shiki'

const cyanTheme: ThemeRegistrationRaw = {
  name: 'cyan-mono',
  type: 'dark',
  colors: {
    'editor.background': '#0a1214',
    'editor.foreground': '#d0e8ec',
  },
  tokenColors: [
    { scope: ['comment', 'punctuation.definition.comment'],
      settings: { foreground: '#4a6a70', fontStyle: 'italic' } },
    { scope: ['string', 'string.quoted'],
      settings: { foreground: '#5fd7ff' } },
    { scope: ['constant.numeric', 'constant.language'],
      settings: { foreground: '#5fd7ff' } },
    { scope: ['keyword', 'storage.type', 'storage.modifier'],
      settings: { foreground: '#00d7ff' } },
    { scope: ['entity.name.function', 'support.function'],
      settings: { foreground: '#00d7d7' } },
    { scope: ['variable', 'variable.other', 'variable.parameter'],
      settings: { foreground: '#b0dfe5' } },
    { scope: ['entity.name.type', 'support.type', 'support.class'],
      settings: { foreground: '#5fd7ff' } },
    { scope: ['punctuation', 'meta.brace'],
      settings: { foreground: '#6a8a8a' } },
    { scope: ['keyword.operator', 'keyword.operator.assignment'],
      settings: { foreground: '#7ab0b8' } },
    { scope: ['meta.tag', 'entity.name.tag'],
      settings: { foreground: '#00d7ff' } },
    { scope: ['entity.other.attribute-name'],
      settings: { foreground: '#5fd7ff' } },
    { scope: ['support.constant', 'constant.other'],
      settings: { foreground: '#5fd7ff' } },
    { scope: ['meta.property-name', 'support.type.property-name'],
      settings: { foreground: '#00d7d7' } },
  ],
}

export default defineShikiSetup(() => ({
  themes: { dark: cyanTheme, light: cyanTheme },
}))
```

注意: テンプレで採用するときは色味（cyan系）を中立的なものに差し替えるか、複数テーマプリセットとして提供すると良い。

---

## 2. `style.css` の汎用改善

### 2-1. 旧 Shiki 上書きハックの削除 → 透明背景の強制のみ残す

```css
/* Shiki インラインの背景色を全て無効化 */
pre.shiki *,
.slidev-code *,
pre[class*="shiki"] *,
pre code span,
pre code .line,
pre code .line span {
  background-color: transparent !important;
  background: transparent !important;
}

/* シンタックスハイライトは setup/shiki.ts のカスタムテーマで制御 */
```

旧 `.shiki span[style*="..."]` ベタ書き上書きブロックは丸ごと削除。

### 2-2. フォントサイズの底上げ（登壇スライドで読みやすくする）

本文と li が小さすぎたので clamp を引き上げ。

```css
h1 { font-size: clamp(1.8rem, 4vw, 2.8rem); }   /* 旧 1.3 / 3.2vw / 2 */
h2 { font-size: clamp(1.4rem, 3.2vw, 2rem); }   /* 旧 1.1 / 2.8vw / 1.6 */
h3 { font-size: clamp(1.2rem, 2.6vw, 1.6rem); } /* 旧 1.0 / 2.2vw / 1.3 */

p  { font-size: clamp(1.1rem, 2vw, 1.3rem); }   /* 旧 0.8 / 1.6vw / 0.95 */
li { font-size: clamp(1.1rem, 2vw, 1.3rem); }   /* 同上 */
```

### 2-3. Slidev デフォルトの h1+p 透過解除

```css
/* Slidev デフォルトテーマの h1 + p { opacity: 50% } を上書き */
.slidev-layout h1 + p {
  opacity: 1;
}
```

これは「タイトル直下の段落が薄くなって読めない」問題の対策で、汎用的に必要。

### 2-4. インライン `code` の視認性向上 + dark対応

```css
code {
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 0.9em;
  padding: 0.2em 0.4em;
  border-radius: 4px;
  background: oklch(0.3 0.06 220);
  color: oklch(0.85 0.15 195);
}

.dark code {
  background: oklch(0.25 0.05 220);
  color: oklch(0.9 0.12 195);
}
```

### 2-5. Inter フォント import (CoverSlideと併せて)

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@700;800;900&display=swap');
```

---

## 3. `components/CoverSlide.vue` の改善

### 3-1. `v-html` 対応（タイトルに `<br>` や装飾を入れられるように）

```vue
<h1 v-if="!gradient" class="cover-title" v-html="title"></h1>
<GradientHeading v-else tag="h1" class="cover-title" v-html="title"></GradientHeading>
```

### 3-2. タイトル/メタのタイポグラフィ強化

```css
.cover-title {
  margin-bottom: 0;
  font-family: 'Inter', sans-serif;
  font-size: clamp(1.8rem, 4vw, 3rem) !important;
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -0.03em;
}

.cover-meta {
  font-size: 1rem;       /* 旧 0.875rem */
  font-weight: 700;
  text-align: center;
  color: oklch(0.85 0.02 270);
}
```

---

## 4. `components/TwoColumnLayout.vue` のリファクタ

### 4-1. `gap` を数値→CSSサイズ文字列に変更（柔軟性向上）

```vue
<script setup lang="ts">
interface Props {
  gap?: string         // 旧 number
  leftRatio?: number
  rightRatio?: number
}

const props = withDefaults(defineProps<Props>(), {
  gap: '3rem',         // 旧 8 (UnoCSS の gap-8 クラス前提)
  leftRatio: 1,
  rightRatio: 1,
})

const gridCols = computed(
  () => `${props.leftRatio}fr ${props.rightRatio}fr`
)
</script>

<template>
  <div class="two-column-layout">
    <div class="column-left">  <slot name="left" />  </div>
    <div class="column-right"> <slot name="right" /> </div>
  </div>
</template>

<style scoped>
.two-column-layout {
  display: grid;
  grid-template-columns: v-bind(gridCols);
  gap: v-bind('props.gap');
  width: 100%;
}

.column-left,
.column-right {
  display: flex;
  flex-direction: column;
  overflow: hidden;   /* 追加: 子のはみ出しを防ぐ */
  min-width: 0;       /* 追加: grid item の縮小を可能に */
}
</style>
```

→ UnoCSS の `gap-N` クラス依存をやめ、`v-bind` で直接 CSS variable 化。`overflow: hidden` / `min-width: 0` は code block を入れた時の overflow 暴発を防ぐ重要な修正。

---

## 5. `.github/workflows/deploy.yml` (新規) — GitHub Pages 自動デプロイ

リポジトリ名だけ差し替えれば再利用可能。

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
        with: { bun-version: latest }
      - run: bun install
      - run: bun run build -- --base /<REPO_NAME>/   # ← ここだけプロジェクト毎に書き換え
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with: { path: './dist' }
      - id: deployment
        uses: actions/deploy-pages@v4
```

template 化するなら `${{ github.event.repository.name }}` を使って自動化するとさらに良い:

```yaml
- run: bun run build -- --base /${{ github.event.repository.name }}/
```

---

## 6. OGP メタタグ (index.html のパターン)

`index.html` 自体は Slidev が自動生成するので template にコミットすべきではないが、**OGP を入れる仕組み**は欲しい。Slidev 流儀では `slides.md` の frontmatter に書く:

```yaml
---
# slides.md の frontmatter
title: 発表タイトル
info: |
  ## 発表情報
  イベント名 / 発表者 / 登壇資料
exportFilename: slides-export

# OGP
seoMeta:
  ogTitle: 発表タイトル
  ogDescription: イベント名 / 発表者 / 登壇資料
  ogImage: https://<user>.github.io/<repo>/og-image.png
  twitterCard: summary_large_image
---
```

これと併せて `public/og-image.png` を置く運用を template の README に明記すると良い。

---

## 7. `bun.lock` の `configVersion` 追加

```diff
 {
   "lockfileVersion": 1,
+  "configVersion": 0,
```

これは bun のバージョン更新で自動的に付くもの。template 側でも `bun install` 一発で揃うので明示対応不要。

---

## template repo 取り込み推奨度サマリ

| 項目 | 推奨度 | 備考 |
|---|---|---|
| `setup/shiki.ts` カスタムテーマ機構 | ★★★ | 色味は中立化orプリセット複数化 |
| `style.css` 旧 shiki ハック削除 + 透明背景 | ★★★ | shiki.ts とセット |
| `style.css` h1+p opacity 解除 | ★★★ | Slidev デフォルトの罠対策 |
| `style.css` フォントサイズ底上げ | ★★☆ | 登壇向けプリセットとして |
| `style.css` インライン code 配色 + dark対応 | ★★★ | |
| `CoverSlide` v-html 対応 | ★★★ | 後方互換あり |
| `CoverSlide` Inter フォント | ★★☆ | 好みなのでオプション化推奨 |
| `TwoColumnLayout` gap を string化 + overflow対策 | ★★★ | **breaking change** なので template 側で初期から採用 |
| `.github/workflows/deploy.yml` | ★★★ | `--base` をリポジトリ名から自動取得に |
| `slides.md` frontmatter での OGP 設定パターン | ★★★ | README に書き方を載せる |

特に **shiki.ts化** と **TwoColumnLayout の overflow/min-width 対策**、**h1+p opacity解除** は「踏みやすい罠」なので template に最初から入れておくとプロジェクト毎の手戻りが減ります。
