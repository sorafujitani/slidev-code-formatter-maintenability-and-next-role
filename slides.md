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
  title="code formatter maintenability and next role?"
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

### Linter, Formatterをよく開発していて、<br/>Formatterはこのままでいいのか？と思っている

<CenteredImage
  src="/images/github-contributions.png"
  alt="2025年10月以降に公開PRやIssueで関わったGitHubリポジトリの一覧"
  width="640px"
/>

---
layout: center
class: text-center
title: これからの需要に対して、保守コストは割に合うのか？
---

<GradientHeading>
  これからの需要に対して、<br>
  保守コストは割に合うのか？
</GradientHeading>

<div class="mt-8">

code formatter の価値と責務を、改めて考えたい。

</div>

<!--
今日の問いを先に置く。
formatterの必要性、メンテナンスコスト、AIにとっての価値、責務を変える提案の順に話す。
-->

---

# なぜ code formatter が必要か

> By far the biggest reason for adopting Prettier is to stop all the on-going debates over styles.

<div class="mt-8">

**コードスタイルによる、人間の議論を終わらせること。**

</div>

<div class="mt-4 text-sm">

出典: <a href="https://prettier.io/docs/why-prettier.html">https://prettier.io/docs/why-prettier.html</a>

</div>

<!--
Prettierの公式ドキュメントにある説明。
ここでは、人間の議論や意思決定にかかるコストを軽減する価値に着目する。
引用は公式ページの冒頭の一文。
-->

---

# それは、これからも必要か

コードを見ることは、以前と比べてどう変わっただろう。

<TwoColumnLayout gap="2.5rem">
  <template #left>
    <ul>
      <li>増えている</li>
      <li>同じくらい</li>
      <li>減っている</li>
    </ul>
  </template>
  <template #right>
    <p>人間がコードを見ることが減るなら、<br>
    <strong>議論や意思決定を減らすツールの価値</strong>は<br>
    どこにあるだろう。</p>
  </template>
</TwoColumnLayout>

<!--
原稿では「半分くらいはnotだと思う」と書いている。
ここでの前提は「人間が見ることが減っているのであれば」という条件。
コードを読む量が全員について減っている、と断定するものではない。
-->

---
layout: center
class: text-center
title: メンテナンスコストが高い
---

<GradientHeading>
  code formatter は、<br>
  メンテナンスコストが高い
</GradientHeading>

<div class="mt-8">

変更要求の頻度が高い。<br>
不具合によって、ユーザーのコードを壊し得る。

</div>

<!--
ここからはメンテナンスする側の話。
原稿にある、変更要求の頻度と、不具合がユーザーのコードへ及ぼす影響の二つに着目する。
-->

---

# 追従する対象が多い

| 対象 | 求められる対応 |
| --- | --- |
| parser | 仕様変更、モダンなparserへの移行 |
| プログラミング言語 | 新構文の追加・変更 |
| Framework | latest、場合によってはnightlyへの対応 |
| formatter自体 | 品質、パフォーマンス、optionの改善 |

<!--
外部の変化への対応と、formatterそのものの改善が並行して発生する。
原稿では、latestや場合によってはnightlyに対しても、不具合のない状態を求められる点を挙げている。
-->

---
layout: center
class: text-center
title: 外部との依存を管理しても限界がある
---

<GradientHeading>
  外部との依存を管理しても、<br>
  保守コストの削減には限界がある
</GradientHeading>

<!--
依存の管理を工夫することだけで、追従の必要性がなくなるわけではない、という問題意識。
ここでAI時代にformatterが提供する価値へ話を戻す。
-->

---
layout: center
class: text-center
title: AIにとって、コードが整形されている価値とは？
---

<GradientHeading>
  AIにとって、<br>
  コードが整形されている価値とは？
</GradientHeading>

<!--
人間にとっての読みやすさから、AIがコードを生成・編集する場面へ視点を移す。
以下のtool callは、原稿に掲載した編集の例。
すべてのモデル・編集ツールが同じ形式を使うという説明ではない。
-->

---

# LLMが出すコードは、一定の整形がされている

編集ツールへの呼び出しにも、`oldText` と `newText` が含まれる。

<div class="code-compact code-tight">

<div class="code-caption">原稿の tool call から、1件の edit を抜粋</div>

```json
{
  "oldText": "func TestClassicCacheWarmDoesNotReadBodies(t *testing.T) {",
  "newText": "func TestClassicCacheWarmReadsOnlyKeys(t *testing.T) {"
}
```

</div>

<div class="mt-8">

**Modelは、置き換え後のコードを文字列として出力している。**

</div>

<!--
原稿のinternal/kiro/snapshot_test.goの編集例から、最初のeditオブジェクトをそのまま抜粋。
pathとeditsの外側、および2件目のeditは省略している。
この例は、formatterなしで常に規約へ完全準拠することを示すものではない。
-->

---

# 改行コードも、newText の一部

単一行を複数行に編集するときは、改行・タブも出力に含まれる。

<div class="code-tight">

<div class="code-caption">原稿の newText の一部（... は省略）</div>

```json
{
  "newText": "...}\n\t\t\tfor _, name := range b.Required { ... }"
}
```

</div>

<div class="mt-8">

`\n` は改行、`\t` はタブ。<br>
**改行やインデントを含む文字列を、Modelがすでに生成している。**

</div>

<!--
原稿のinternal/spec/synopsis.goの例。
長いFormの初期化とfor文の本体は省略し、改行・タブを含む部分を示している。
原稿のnewTextをそのまま実行できる完全なコードとして示すものではない。
-->

---

# token消費量に、どれだけ効くのか

<TwoColumnLayout gap="2.5rem">
  <template #left>
    <h2>format</h2>
    <p>改行・空白・インデントなど、<br>コードの形式を整える。</p>
  </template>
  <template #right>
    <h2>構文の簡約</h2>
    <p>Linterのように、<br>より簡潔な構文へ置き換える。</p>
  </template>
</TwoColumnLayout>

<div class="mt-8">

**formatによるtoken削減には、期待しにくいのではないか。**

</div>

<!--
原稿では「Linterのように、より簡潔な構文に置き換えることもしない」「token消費量に有効ではない」としている。
このスライドでは、その問題意識を問いとして提示する。
token数やコストの削減効果は測定していない。モデル、tokenizer、入力形式によって変わるため、効果が常にゼロだとは断定しない。
-->

---
layout: center
class: text-center
title: 行数やASTを元にした改行判断で十分ではないか？
---

<GradientHeading>
  行数やASTを元にした<br>
  改行判断で十分ではないか？
</GradientHeading>

<div class="mt-8">

AIが扱うコードに、どこまでの整形が必要なのか。

</div>

<!--
原稿にある、行数やASTを元にした改行判断に絞れるのではないか、という仮説。
ASTはコードの構文を木構造で表したもの。
十分だと検証済みの設計ではなく、責務を考え直すための問いとして示す。
-->

---

# format を、Lintとして扱う

<div class="mt-8">

1. **format自体は、AIが行う**
2. **形式の違反を、機械的に検知する**
3. **code formatterには、コードを編集させない**

</div>

<!--
原稿の提案。
「format自体はAIで可能だろう。それを機械的に検知できればいいはず」という考えを、役割の分担として示す。
AIによる整形の信頼性や、検査する仕組みの保守コストは、この原稿では検証していない。
-->

---

# 「検知」と「編集」の責務を分ける

<TwoColumnLayout gap="3rem">
  <template #left>
    <h2>機械的な検査</h2>
    <p>formatの違反を検知する。</p>
    <p><strong>コードを編集しない。</strong></p>
  </template>
  <template #right>
    <h2>AI</h2>
    <p>検査結果を受けて、<br>コードを整形する。</p>
    <p><strong>編集を担当する。</strong></p>
  </template>
</TwoColumnLayout>

<!--
一つ前の提案を、担当する仕事の違いとして図式化したスライド。
実装済みのシステムを説明しているわけではない。
「書き換えをしない」という変更だけで、メンテナンスコストが必ず下がると示したものでもない。
-->

---
layout: center
class: text-center
title: 責務を変えて、より持続可能にする
---

<GradientHeading>
  責務を変えて、<br>
  より持続可能にする
</GradientHeading>

<div class="mt-8">

これからの需要に、今の開発・保守コストは割に合うのか。<br>
**私は、割に合わなくなると考えている。**

</div>

<!--
原稿の結論は「合わない。責務を変えて、より持続可能にする必要があるだろう」。
人間の意思決定コストを減らす価値、追従のコスト、AIによる編集を踏まえた発表者の見解として締める。
-->

---

# 原稿・参考資料

<div class="text-base leading-relaxed">

**原稿**

<a href="https://scrapbox.io/sorafujitani/AI時代の_code_formatter_について考える">https://scrapbox.io/sorafujitani/AI時代の_code_formatter_について考える</a>

<div class="mt-6"></div>

**Why Prettier?**

<a href="https://prettier.io/docs/why-prettier.html">https://prettier.io/docs/why-prettier.html</a>

<div class="mt-6"></div>

**スライドのベース**

<a href="https://github.com/sorafujitani/slidev-code-formatter-maintenability-and-next-role">https://github.com/sorafujitani/<br>slidev-code-formatter-maintenability-and-next-role</a>

</div>

<!--
原稿と公式の引用元、スライドのベース。
原稿・引用元の確認日: 2026-10-19。
-->

---
layout: center
class: text-center
title: ありがとうございました
---

<GradientHeading>ありがとうございました</GradientHeading>

<div class="mt-8">

<SocialLinks github="sorafujitani" x="sorafujitani" />

</div>

<!--
質疑応答。
-->
