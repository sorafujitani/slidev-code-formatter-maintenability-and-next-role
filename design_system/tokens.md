# デザイントークン

このドキュメントでは、テンプレート全体で使用されるデザイントークン（デザインの基本要素）を定義します。

## カラーパレット

### oklch Color Space について

このテンプレートでは、**oklch color space** を採用しています。oklchは知覚的に均一な色空間で、以下の利点があります：

- 人間の目に均一に見える色の変化
- グラデーションが自然で美しい
- ダークモード対応が容易

### 主要カラー

#### Primary Colors (Purple to Blue Gradient)

```css
--color-primary: oklch(0.6 0.2 270);      /* 基本の紫 */
--color-secondary: oklch(0.65 0.2 240);   /* 紫から青への中間 */
--color-accent: oklch(0.7 0.18 210);      /* アクセントの青 */
```

**使用例**: ボタン、リンク、強調要素

#### Text Colors

```css
--color-text: oklch(0.2 0.02 270);           /* 本文テキスト */
--color-text-muted: oklch(0.5 0.05 270);     /* 補足テキスト */
```

**使用例**:
- `--color-text`: 見出し、本文
- `--color-text-muted`: キャプション、メタ情報

#### Background Colors

```css
--color-bg: oklch(0.97 0.003 260);          /* 少し落とした白背景 */
--color-bg-soft: oklch(0.97 0.003 260);     /* 白背景 */
--slide-background: var(--color-bg);
```

**使用例**:
- `--color-bg`: スライドの基本背景
- `--color-bg-soft`: 背景と同じ値。派生デザインで必要な場合のために残す
- `--slide-background`: スライド全体の背景

### ダークモード

```css
.dark {
  --color-text: oklch(0.9 0.02 270);
  --color-text-muted: oklch(0.6 0.05 270);
  --color-bg: oklch(0.15 0.02 270);
  --color-bg-soft: oklch(0.2 0.03 270);
}
```

### グラデーション

#### 白背景（全スライド共通）

少し落とした白背景を標準にします。全スライドに自動適用されます。

```css
background: var(--slide-background);
```

**特徴**:
- 少し落とした白背景を基準にするため、生成スライドの見た目が安定する
- 本文や画像の背景を邪魔する装飾を入れない

旧来のグレー基調グラデーションを使いたい場合は、スライド frontmatter に `class: soft-gradient-bg` を指定します。

```md
---
class: soft-gradient-bg
---
```

#### メイングラデーション (Purple to Blue)

```css
background: linear-gradient(135deg,
  oklch(0.65 0.25 270) 0%,
  oklch(0.7 0.22 240) 50%,
  oklch(0.75 0.2 210) 100%
);
```

**使用場所**: グラデーション見出し、強調要素

## タイポグラフィ

### フォントファミリー

```css
font-family: 'Noto Sans JP', -apple-system, BlinkMacSystemFont, 'Hiragino Sans',
             'Yu Gothic', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
```

本文・見出しは `Noto Sans JP` を主にします。英語と日本語の太さが大きくズレる指定を避けるためです。

**コード用フォント**:
```css
font-family: ui-monospace, 'SFMono-Regular', Menlo, Monaco, Consolas,
             'Liberation Mono', monospace;
font-variant-ligatures: none;
font-feature-settings: "liga" 0, "calt" 0;
```

コードは system monospace を使い、`=>` が ligature で別記号に見えないようにします。

### フォントサイズ

| 要素 | サイズ (clamp) | 用途 |
|------|---------------|------|
| h1 | `clamp(1.8rem, 4vw, 2.8rem)` | 主見出し |
| h2 | `clamp(1.4rem, 3.2vw, 2rem)` | 副見出し |
| h3 | `clamp(1.2rem, 2.6vw, 1.6rem)` | 小見出し |
| p, li | `clamp(1.1rem, 2vw, 1.3rem)` | 本文 |
| small | `0.875rem` | キャプション |

**clamp の利点**: レスポンシブに対応し、画面サイズに応じて適切なサイズに調整されます

### フォントウェイト

| ウェイト | 値 | 用途 |
|---------|---|------|
| Extra Bold | 800 | h1 見出し |
| Bold | 700 | h2 見出し |
| Semi Bold | 600 | h3 見出し |
| Regular | 400 | 本文 |

### 行間 (line-height)

| 要素 | 行間 |
|------|------|
| h1 | 1.2 |
| h2 | 1.3 |
| h3 | 1.4 |
| p, li | 1.8 |

## スペーシング

### Margin/Padding スケール

Tailwind CSS の標準スケールを使用:

| クラス | 値 | 用途 |
|--------|---|------|
| `mt-4` | 1rem | 小さい余白 |
| `mt-8` | 2rem | 中程度の余白 |
| `mt-12` | 3rem | 大きい余白 |
| `mt-16` | 4rem | 非常に大きい余白 |
| `mt-20` | 5rem | 特大の余白 |

### 標準パディング

スライド全体のパディングは **9%（水平）/ 6%（垂直）** に標準化されています。
通常スライドの内容が左上に寄りすぎないよう、縦方向は中央寄せを基本にします。

```css
.slidev-layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 6% 9%;
}
```

### 表紙背景

`CoverSlide background="cyanTop"` は、PDF export での色変化を避けるため `oklch(... / alpha)` ではなく `rgb(... / alpha)` の透過グラデーションを使います。

```css
background:
  radial-gradient(ellipse 132% 72% at 50% -14%,
    rgb(118 220 232 / 0.9) 0%,
    rgb(178 234 241 / 0.68) 48%,
    transparent 78%
  ),
  linear-gradient(180deg,
    rgb(224 246 250) 0%,
    var(--color-bg) 58%,
    var(--color-bg) 100%
  );
```

### よく使うスペーシングパターン

```md
<!-- タイトルとサブタイトルの間 -->
<div class="mt-8">サブタイトル</div>

<!-- セクション間 -->
<div class="mt-12">次のセクション</div>

<!-- 表紙のタイトル位置調整 -->
<div class="mt-20">タイトル</div>
```

## エフェクト

### シャドウ

#### 画像シャドウ
```css
box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
```

#### テキストシャドウ (アニメーション付き)
```css
@keyframes text-shadow-pulse {
  0%, 100% {
    text-shadow: 0 0 10px color-mix(in oklch, var(--color-primary) 30%, transparent);
  }
  50% {
    text-shadow: 0 0 20px color-mix(in oklch, var(--color-primary) 50%, transparent);
  }
}
```

### ボーダー半径

| 用途 | 値 |
|------|---|
| 小（コードブロック） | `4px` |
| 中（カード） | `8px` |
| 大（画像） | `12px` |

## アニメーション

### トランジション

```css
transition: all 0.3s ease;  /* 標準 */
transition: opacity 0.2s;    /* ホバー効果 */
```

### グラデーションシフト

```css
@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
animation: gradient-shift 8s ease infinite;
```

### Text Shine（テキストシャインエフェクト）

グラデーションが流れるアニメーション効果。

```css
.text-shine {
  animation: text-shine 3s linear infinite;
}
```

**使用例**:
```html
<h1 class="text-shine">輝くタイトル</h1>
```

## 使用方法

### CSS変数の使用

```css
.my-element {
  color: var(--color-text);
  background: var(--color-bg);
}
```

### Tailwind クラスの使用

```html
<div class="mt-8 text-gray-500">
  コンテンツ
</div>
```

## カスタマイズ

これらのトークンは `style.css` で定義されています。プロジェクトに合わせて値を調整できます。

```css
:root {
  --color-primary: oklch(0.6 0.2 270);  /* 好みの色に変更可能 */
}
```
