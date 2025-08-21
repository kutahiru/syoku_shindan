export interface Question {
  specialResult: string;
  specialResultMsg: string;
  points: number;
  question: string;
  image: string;
}

// prettier-ignore
export const onePointQuestions: Question[] = [
  { specialResult: "", specialResultMsg: "", points: 1, question: "スーパーで買い物をする時、予定にない食べ物を衝動買いしてしまうことがありますか？", image: "" },
  { specialResult: "", specialResultMsg: "", points: 1, question: "ダイエット中でも美味しい物の誘惑に負けてしまうことがありますか？", image: "" },
  { specialResult: "", specialResultMsg: "", points: 1, question: "好きな食べ物が3つ以上すぐに思いつきますか？", image: "" },
  { specialResult: "", specialResultMsg: "", points: 1, question: "食べ物の話をするのが好きですか？", image: "" },
  { specialResult: "", specialResultMsg: "", points: 1, question: "次の食事を楽しみにしていることが多いですか？", image: "" },
  { specialResult: "", specialResultMsg: "", points: 1, question: "大食い動画を見るのが好きですか？", image: "" },
  { specialResult: "", specialResultMsg: "", points: 1, question: "匂いで人の家の晩御飯が分かる時がありますか？", image: "" },
];

// prettier-ignore
export const twoPointQuestions: Question[] = [
  { specialResult: "", specialResultMsg: "", points: 2, question: "孤独のグルメが好きですか？", image: "" },
  { specialResult: "", specialResultMsg: "", points: 2, question: "最後の晩餐を考えたことがありますか？", image: "" },
  { specialResult: "", specialResultMsg: "", points: 2, question: "人生で大切なものトップ5に食事が入ると思いますか？", image: "" },
  { specialResult: "", specialResultMsg: "", points: 2, question: "料理番組やグルメ番組をよく見ますか？", image: "" },
  { specialResult: "", specialResultMsg: "", points: 2, question: "季節の食べ物を意識して選びますか？", image: "" },
  { specialResult: "", specialResultMsg: "", points: 2, question: "食事に対してこだわりがありますか？", image: "" },
  { specialResult: "", specialResultMsg: "", points: 2, question: "恋人とのデートプランは食事を中心に考えますか？", image: "" },
  { specialResult: "", specialResultMsg: "", points: 2, question: "疲れていても美味しい物のためなら元気が出ますか？", image: "" },
];

// prettier-ignore
export const threePointQuestions: Question[] = [
  { specialResult: "", specialResultMsg: "", points: 3, question: "シェフや生産者の話に興味がありますか？", image: "" },
  { specialResult: "", specialResultMsg: "", points: 3, question: "料理本やグルメ雑誌に興味がありますか？", image: "" },
  { specialResult: "", specialResultMsg: "", points: 3, question: "高級な食事にお金をかけることに抵抗がありませんか？", image: "" },
  { specialResult: "", specialResultMsg: "", points: 3, question: "1時間以上並んでも美味しい食べ物のためなら苦になりませんか？", image: "" },
  { specialResult: "", specialResultMsg: "", points: 3, question: "美味しい食事のためなら他の趣味を我慢できますか？", image: "" },
  { specialResult: "", specialResultMsg: "", points: 3, question: "外国の食文化に興味を持っていますか？", image: "" },
];

// prettier-ignore
export const specialPointQuestions: Question[] = [
  { specialResult: "食神", specialResultMsg: "大いなる代償を乗り越えしもの", points: 0, question: "痛風になっても好きなものを食べますか？", image: "syokushin.png" },
  { specialResult: "効率厨", specialResultMsg: "栄養がない食べ物は食べる意味なし", points: 0, question: "食事は味よりも栄養素が大事ですか？", image: "kouritu.png" },
  { specialResult: "トレーニー", specialResultMsg: "タンパク！エビオス！タンパク！", points: 0, question: "タンパク！タンパク！タンパク！", image: "training.png" },
  { specialResult: "食育者", specialResultMsg: "食とは文化である", points: 0, question: "スローフードのスローガンを知っていますか？", image: "shokuiku.png" },
  { specialResult: "油人", specialResultMsg: "油はうまみ。油は血液。油は生命。", points: 0, question: "ぎとぎとした食べ物が大好き。さっぱりしてる食べ物はだいたい美味しくない。", image: "abura.png" },
  { specialResult: "深夜の魔人", specialResultMsg: "0時過ぎのシーフードヌードルがいっちゃんうまい", points: 0, question: "最近深夜にシーフードヌードルを食べた。", image: "shinya.png" },
  { specialResult: "〇U〇T〇Qの校長", specialResultMsg: "あなたは校長", points: 0, question: "今日もランチはファミチキにする。", image: "kouchou.png" },
  { specialResult: "辛味中毒者", specialResultMsg: "辛さは痛みではない。それは快楽だ。", points: 0, question: "辛くない料理はこの世に必要ない", image: "karami.png" },
  { specialResult: "ブレない心", specialResultMsg: "胃袋に一本の太い柱が立っている。", points: 0, question: "同じ食べ物をずっと食べ続けられる", image: "burenai.png" },
  { specialResult: "完食至上主義", specialResultMsg: "残すのは罪。食べ切るのが正義。", points: 0, question: "どんなにお腹いっぱいでも必ず完食する。", image: "kanshoku.png" },
  { specialResult: "カロリー計算機", specialResultMsg: "常に0キロカロリーを探している。", points: 0, question: "食事は常にカロリーを確認している。", image: "calorie.png" },
  { specialResult: "愛酒家", specialResultMsg: "お酒あっての食事。ご飯はつまみ。", points: 0, question: "食事にはお酒がかかせない。", image: "sake.png" },
];
