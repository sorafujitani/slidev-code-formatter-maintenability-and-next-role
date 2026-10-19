# レイアウトパターン

Slidev で使用できる主要なレイアウトパターンとその使い分けを説明します。

## 標準レイアウト一覧

### 1. デフォルトレイアウト

最も基本的なレイアウト。特に指定しない場合はこれが使用されます。

```md
---
# layout 指定なし（デフォルト）
---

# タイトル

コンテンツ
```

**特徴**:
- 左寄せ、垂直方向は中央寄せ
- padding: `6% 9%`
- 汎用性が高く、ほとんどのスライドで使用可能

**使用シーン**: 通常のコンテンツスライド、リスト、テキスト説明など

---

### 2. Two Columns レイアウト

コンテンツを2カラムに分割します。

```md
---
layout: two-cols
---

# 左側のコンテンツ

説明や箇条書き

::right::

# 右側のコンテンツ

画像やコード
```

**特徴**:
- 画面を左右に分割
- `::right::` で右側のコンテンツを定義
- 左右の比率は均等

**使用シーン**:
- コードと説明を並べる
- 画像とテキストを並べる
- Before/After の比較
- 自己紹介（プロフィール画像とテキスト）

**コンポーネント版**: `<TwoColumnLayout>` を使用すると、より柔軟に設定可能

```md
<TwoColumnLayout :gap="8">
  <template #left>左側</template>
  <template #right>右側</template>
</TwoColumnLayout>
```

---

### 3. Center レイアウト

コンテンツを画面中央に配置します。

```md
---
layout: center
---

# 中央に配置されるタイトル

コンテンツも中央揃え
```

**特徴**:
- 水平・垂直方向ともに中央寄せ
- テキストも中央揃え

**使用シーン**:
- セクションの区切りスライド
- シンプルなメッセージ
- クロージングスライド
- 質疑応答スライド

---

### 4. Cover レイアウト（カスタム）

表紙専用のレイアウト。`<CoverSlide>` コンポーネントで実装。

```md
<CoverSlide
  title="プレゼンテーションタイトル"
  subtitle="サブタイトル"
  event="イベント名"
  author="あなたの名前"
  background="cyanTop"
  :social="{ github: 'username', x: 'username' }"
/>
```

**特徴**:
- タイトルを大きく表示
- サブタイトル、イベント名、著者名を配置
- SNSリンクを右下に自動配置
- `cyanTop` 背景は PDF export での色変化を避けるため `rgb(... / alpha)` を使用

**使用シーン**: プレゼンテーションの1ページ目（表紙）

---

### 5. Profile レイアウト（カスタム）

プロフィール専用の2カラムレイアウト。`<ProfileSlide>` コンポーネントで実装。

```vue
<ProfileSlide
  name="fujitani sora"
  affiliation="toridori inc engineer"
  x="sorafujitani"
  github="sorafujitani"
  website="https://sorafujitani.me/"
  avatar="https://example.com/profile.png"
  :items="[
    { icon: 'calendar', label: '2001 (25)' },
  ]"
/>
```

**特徴**:
- 左に名前とプロフィール項目
- 右にプロフィール画像と補助画像
- `items` で任意項目を追加できる
- 左カラムの縦位置、画像幅を props で調整できる

**使用シーン**: 自己紹介、登壇者紹介、About slide

---

### 6. 生成コード紹介レイアウト

生成コマンドと生成コード抜粋を1枚で見せるレイアウト。

~~~md
# config file を生成する

<div class="nested-compact">

- 生成コマンド
  - `bun run generate && bun run build`
- 生成された型定義を短い抜粋で見せる
  - `src/generated/config.ts`

</div>

<div class="code-compact code-tight">

<div class="code-caption">src/generated/config.ts:12</div>

```ts
export interface GeneratedConfig {
  featureExample?: FeatureExampleOptions
}
```

</div>
~~~

**特徴**:
- command / file は子 bullet として控えめに表示
- code block は compact 表示
- filename / line number は `code-caption` で表示

---

## レイアウトの組み合わせ

### スライド背景

白背景が自動適用されます。追加クラスは不要です。

```md
---
layout: center
---

# タイトル
```

---

### テキスト中央寄せ

```md
---
layout: center
class: text-center
---

# 中央寄せタイトル

すべてのテキストが中央に
```

---

## 手動レイアウト

Slidev の標準レイアウトを使わず、Tailwind CSS で手動レイアウトも可能です。

### Grid レイアウト

```md
<div class="grid grid-cols-2 gap-8">
  <div>左側</div>
  <div>右側</div>
</div>
```

### Flexbox レイアウト

```md
<div class="flex justify-between items-center">
  <div>左</div>
  <div>右</div>
</div>
```

### 3カラムレイアウト

```md
<div class="grid grid-cols-3 gap-4">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>
```

---

## レイアウト選択のガイドライン

| 用途 | 推奨レイアウト |
|------|---------------|
| 通常のコンテンツ | デフォルト |
| コードと説明 | two-cols |
| 画像とテキスト | two-cols |
| セクション区切り | center |
| 質疑応答 | center |
| 表紙 | CoverSlide コンポーネント |
| 自己紹介 | ProfileSlide コンポーネント |
| 生成コード紹介 | default + `nested-compact` + `code-compact` |
| 最終ページ | center + text-center |

---

## よくある使用例

### 自己紹介スライド

```vue
<ProfileSlide
  name="fujitani sora"
  affiliation="toridori inc engineer"
  x="sorafujitani"
  github="sorafujitani"
  website="https://sorafujitani.me/"
  avatar="https://example.com/profile.png"
/>
```

---

### セクション開始スライド

```md
---
layout: center
---

# <span class="gradient-heading">次のセクション</span>

セクションの説明
```

**背景**: 白背景が自動適用されるため、追加クラスは不要

---

### 最終スライド

```md
---
layout: center
class: text-center
---

# <span class="gradient-heading">ご清聴ありがとうございました</span>

<div class="mt-8">
  <SocialLinks
    github="username"
    x="username"
  />
</div>
```

---

## トランジション

すべてのレイアウトに対して、トランジション効果を指定できます。

```md
---
layout: two-cols
transition: slide-left  # デフォルトで設定済み
---
```

**主なトランジション**:
- `slide-left` (デフォルト)
- `slide-up`
- `fade`
- `none`

---

## Tips

1. **余白の調整**: `mt-8`, `mb-12` などの Tailwind クラスで調整
2. **画像の配置**: `flex` や `grid` を活用
3. **レスポンシブ**: clamp() を使ったフォントサイズで自動調整
4. **一貫性**: 同じタイプのスライドには同じレイアウトを使用
