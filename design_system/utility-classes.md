# ユーティリティクラス

参考スライド準拠のユーティリティクラス一覧です。

## レイアウト

### カラムレイアウト

#### columns_h（水平カラム）

水平方向に自動で均等分割されるグリッドレイアウト。

```html
<div class="columns_h">
  <div>カラム1</div>
  <div>カラム2</div>
  <div>カラム3</div>
</div>
```

**特徴**:
- 自動で等幅のカラムを生成
- gap: 1rem でスペーシング

#### columns_v（垂直カラム）

垂直方向に配置されるグリッドレイアウト。

```html
<div class="columns_v">
  <div>行1</div>
  <div>行2</div>
  <div>行3</div>
</div>
```

**特徴**:
- 垂直方向に要素を配置
- gap: 1rem でスペーシング

---

## 配置

### center（中央配置）

要素を中央に配置します。

```html
<div class="center">
  中央配置されるコンテンツ
</div>
```

**適用される効果**:
- Flexboxで水平・垂直中央配置
- text-align: center

### right（右寄せ）

要素を右寄せで配置します。

```html
<div class="right">
  右寄せのコンテンツ
</div>
```

**適用される効果**:
- Flexboxで右寄せ
- text-align: right

### left（左寄せ）

要素を左寄せで配置します。

```html
<div class="left">
  左寄せのコンテンツ
</div>
```

**適用される効果**:
- Flexboxで左寄せ
- text-align: left

---

## アニメーション

### text-shine（テキストシャイン）

グラデーションが流れるテキストアニメーション。

```html
<h1 class="text-shine">輝くタイトル</h1>
```

**特徴**:
- Purple to Blue のグラデーション
- 3秒周期でアニメーション
- 無限ループ

### animated-shadow（アニメーションシャドウ）

テキストシャドウが脈打つようにアニメーション。

```html
<h1 class="animated-shadow">強調タイトル</h1>
```

**特徴**:
- 2秒周期で明滅
- oklch color spaceによる美しいシャドウ

---

## デザイン要素

### gradient-heading（グラデーション見出し）

グラデーションテキスト効果。

```html
<h1><span class="gradient-heading">グラデーション見出し</span></h1>
```

### curved-underline（曲線アンダーライン）

テキストに曲線のアンダーラインを追加。

```html
<span class="curved-underline">強調テキスト</span>
```

---

## コード表示

### code-caption（ファイル名・行番号）

コードブロックの直前に、ファイル名や行番号を控えめに表示します。

```html
<div class="code-caption">src/generated/config.ts:12</div>
```

### code-compact（小さめのコードブロック）

2-8 行程度の短い抜粋を、1枚のスライドに収めたい時に使います。

~~~md
<div class="code-compact">

<div class="code-caption">src/generated/config.ts:12</div>

```ts
export const value = 'example'
```

</div>
~~~

**特徴**:
- `.shiki` の padding と font-size を小さくする
- filename caption と組み合わせる
- 生成コード紹介や実コード抜粋に向く

### code-tight（上下余白を詰める）

コードブロックの上下余白を小さくします。

~~~md
<div class="code-compact code-tight">

```ts
const value = 'example'
```

</div>
~~~

---

## リスト

### nested-compact（ネストした箇条書き）

親 bullet を説明、子 bullet を command / file / code id として見せたい時に使います。

```md
<div class="nested-compact">

- 生成コマンド
  - `bun run generate`
- 出力ファイル
  - `src/generated/config.ts`

</div>
```

**特徴**:
- 子 bullet の色を少し控えめにする
- 2 階層までを読みやすくする
- inline code が本文から分かれる

---

## 組み合わせ例

### 3カラムレイアウト

```html
<div class="columns_h">
  <div class="center">
    <h2>機能1</h2>
    <p>説明</p>
  </div>
  <div class="center">
    <h2>機能2</h2>
    <p>説明</p>
  </div>
  <div class="center">
    <h2>機能3</h2>
    <p>説明</p>
  </div>
</div>
```

### 輝くセンタータイトル

```html
<div class="center">
  <h1 class="text-shine">ご清聴ありがとうございました</h1>
</div>
```

### グラデーション + アニメーション

```html
<h1 class="gradient-heading animated-shadow">
  超強調タイトル
</h1>
```

---

## TailwindとVue/Slidevの違い

### 既存のTailwindクラス

Tailwindのユーティリティは引き続き使用できます：
- `flex`, `grid`
- `mt-8`, `mb-4`
- `text-center`, `text-xl`

### カスタムユーティリティ

このテンプレート独自のクラス：
- `columns_h` / `columns_v`
- `center` / `right` / `left`
- `text-shine`
- `animated-shadow`
- `gradient-heading`
- `curved-underline`
- `code-caption`
- `code-compact`
- `code-tight`
- `nested-compact`

---

## ベストプラクティス

1. **シンプルに**: 複雑なレイアウトは避け、ユーティリティクラスで簡潔に
2. **組み合わせ**: 複数のクラスを組み合わせて効果を最大化
3. **一貫性**: 同じタイプの要素には同じクラスを使用
4. **パフォーマンス**: アニメーションクラスは控えめに使用

---

## 参考

- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Slidev Layouts](https://sli.dev/builtin/layouts.html)
