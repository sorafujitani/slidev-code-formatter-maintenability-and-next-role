---
theme: default
layout: cover
colorSchema: light
background: false
class: text-center
highlighter: shiki
lineNumbers: true
shikiConfig:
  theme: 'balanced-dark'
drawings:
  persist: false
transition: slide-left
title: AI時代の code formatter について考える
mdc: true
fonts:
  sans: 'Noto Sans JP'
  mono: 'SFMono-Regular'
---

<CoverSlide
  title="<span style='white-space: nowrap'>code formatter maintenability</span><br>and next role"
  subtitle=""
  event="俺の勉強会#8"
  author="fujitani sora"
  background="cyanTop"
/>

<!--
code formatterが担ってきた役割は、AIを使った開発でも同じなのか。
これからの需要に対して、開発・メンテナンスコストが見合うのかを考える。
本発表は原稿の問題意識と提案をまとめたもので、効果を実測した報告ではない。
原稿: https://scrapbox.io/sorafujitani/AI時代の_code_formatter_について考える
-->

---
title: 自己紹介
---

<ProfileSlide
  name="fujitani sora"
  x="sorafujitani"
  github="sorafujitani"
  website="https://sorafujitani.me/"
  avatar="https://raw.githubusercontent.com/fs0414/imgs/main/fs0414_dot_image.png"
  avatarWidth="200px"
  avatarPosition="left-bottom"
  leftOffset="0px"
  secondaryImage="/images/wabi-profile.png"
  secondaryImageAlt="wabiさんのプロフィールと、@sorafujitaniへの言及に矢印を添えたスクリーンショット"
  secondaryImageWidth="500px"
  :items="[
    { icon: 'calendar', label: '2001 (25)' },
  ]"
/>

<!--
ベースの自己紹介を維持。
-->

---
layout: default
class: text-center
---

### linter, formatterをよく開発している

<CenteredImage
  src="/images/github-contributions.png"
  alt="2025年10月以降に公開PRやIssueで関わったGitHubリポジトリの一覧"
  width="640px"
/>

<div class="mt-6 text-2xl font-bold" style="color: var(--color-accent)">code formatterって今のままでいいのか？と思っている</div>

---

# なぜ code formatter が必要か

> By far the biggest reason for adopting Prettier is to stop all the on-going debates over styles.

<div class="mt-8">

**コードスタイルによる、人間の議論を終わらせること。**

</div>

<div class="mt-4 text-sm">

<a href="https://prettier.io/docs/why-prettier.html">https://prettier.io/docs/why-prettier.html</a>

</div>

<!--
Prettierの公式ドキュメントにある説明。
ここでは、人間の議論や意思決定にかかるコストを軽減する価値に着目する。
引用は公式ページの冒頭の一文。
-->

---
layout: default
class: text-left
title: ツールの価値はメンテナンスコストに見合うかどうか
---

- code formatterは、<br><strong style="color: var(--color-accent)">メンテナンスコストが高い</strong>ツールだと考えている
- コードを見ることが減っていくであろうこれから、<br><strong style="color: var(--color-accent)">ツールの価値はメンテナンスコストに見合うかどうか</strong>

<style scoped>
li {
  font-size: 1.5rem;
  line-height: 1.65;
  margin-bottom: 1.5rem;
}
</style>

---

<div class="maintenance-page">

<div class="maintenance-label">メンテナンスコストが高い理由 · 1/2</div>

# 不具合の影響が大きい

**コードを書き換えるリスクのあるツール。**

- 不具合によって、ユーザーのコードを暗黙的に壊し得る。
- git hookで自動実行されると、<br>不具合による変更に気づきにくいこともある。

</div>

<style scoped>
.maintenance-page {
  width: 100%;
  height: 100%;
  padding-top: 1rem;
}

.maintenance-label {
  color: var(--color-text-muted);
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

h1 {
  font-size: 2.25rem;
  line-height: 1.3;
  margin-bottom: 1.5rem;
}

p, li {
  font-size: 1.5rem;
  line-height: 1.65;
}

li {
  margin-bottom: 1rem;
}
</style>

---

<div class="maintenance-page">

<div class="maintenance-label">メンテナンスコストが高い理由 · 2/2</div>

# 追従する対象が多い

| 対象 | 求められる対応 |
| --- | --- |
| parser | 仕様変更、モダンなparserへの移行 |
| プログラミング言語 | 新構文の追加・変更 |
| framework | latest、場合によってはnightlyへの対応 |
| formatter自体 | 品質、パフォーマンス、optionの改善 |

</div>

<style scoped>
.maintenance-page {
  width: 100%;
  height: 100%;
  padding-top: 1rem;
}

.maintenance-label {
  color: var(--color-text-muted);
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

h1 {
  font-size: 2.25rem;
  line-height: 1.3;
  margin-bottom: 1.5rem;
}

table {
  width: 100%;
  font-size: 1.375rem;
  line-height: 1.5;
}

th, td {
  padding: 0.6rem 0.75rem;
}

th:first-child, td:first-child {
  width: 32%;
}
</style>

<!--
外部の変化への対応と、formatterそのものの改善が並行して発生する。
原稿では、latestや場合によってはnightlyに対しても、不具合のない状態を求められる点を挙げている。
-->

---

# LLMが出すコードは、一定の整形がされている

LLMは、改行やインデントを含むコードを文字列として出力する。

<div class="code-tight edit-example">

```json
"edits": [
  {
    "oldText": "function greet() {}",
    "newText": "function greet() {\n\tconsole.log('Hello');\n}"
  }
]
```

</div>

<div class="mt-8">

`\n` は改行、`\t` はタブ（インデント）

</div>

<style scoped>
.edit-example {
  --slidev-code-font-size: 18px;
  --slidev-code-line-height: 28px;
}

.edit-example :deep(pre),
.edit-example :deep(pre code),
.edit-example :deep(pre .line) {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
</style>

<!--
LLMによる編集ツールの呼び出しを、空の関数にHelloを表示する処理を追加する例で簡略化。
newTextの文字列には改行とタブも含まれている。
この例は、formatterなしで常に規約へ完全準拠することを示すものではない。
-->

---

<div class="cost-question">

<p class="comparison">メンテナンスコスト &gt; formatterの仕事量</p>

この状態に近づいているかもしれない

</div>

- formatterが不要になるわけではないと思う
- LLMだけでは、人間が意識しないようにするための<br>「信頼」をカバーしきれないだろう
- ただ、ツールを取り巻く前提が変化するごとに、<br>その価値も問われ直す必要がある
- AIも使いつつ、この前提を疑える人が、<br>今後のツールチェーンを作っていく人になるのかも

<style scoped>
p, li {
  font-size: 1.5rem;
  line-height: 1.5;
}

li {
  margin-bottom: 0.5rem;
}

.cost-question {
  margin-bottom: 1rem;
}

.comparison {
  color: var(--color-accent);
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}
</style>

---
layout: center
class: text-center
title: See you later 👋
---

<GradientHeading>See you later <span style="-webkit-text-fill-color: initial">👋</span></GradientHeading>

<!--
質疑応答。
-->
