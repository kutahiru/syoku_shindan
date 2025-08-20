// 回答と重要度を格納
export interface Answer {
  value: boolean;
  specialResult: string; // 特別結果（文字列）
  specialResultMsg: string; // 特別結果のメッセージ
  points: number; // ポイント数
  image: string; // 画像ファイル名
}

// 診断結果を格納
export interface DiagnosisResult {
  title: string;
  description: string;
  image: string;
}

// 診断を評価する関数
export function evaluateDiagnosis(answers: Answer[]): DiagnosisResult {
  // スペシャル問題の確認
  const specialResults = answers.filter(
    (answer) => answer.specialResult !== "" && answer.value
  );

  // スペシャル問題に該当する場合、スペシャルな回答をそのまま表示
  if (specialResults.length > 0) {
    return {
      title: specialResults[0].specialResult,
      description: specialResults[0].specialResultMsg,
      image: specialResults[0].image,
    };
  }

  // スペシャル問題に該当しない場合はポイント数を集計して通常の判定
  // 通常の質問のポイント合計値
  const totalPoints = answers
    .filter((answer) => answer.specialResult === "" && answer.value)
    .reduce((sum, answer) => sum + answer.points, 0);

  if (totalPoints >= 10) {
    return {
      title: "食べるために生きる人",
      description: "美味しい食事を求めて今日も旅は続く。",
      image: "taberu.png",
    };
  } else if (totalPoints >= 7) {
    return {
      title: "食べるために生きる人",
      description: "食事が楽しみ。一日三回の小さな幸せ。",
      image: "taberu.png",
    };
  } else if (totalPoints >= 2) {
    return {
      title: "生きるために食べる人",
      description: "食べることは生きること。それ以上でもそれ以下でもない。",
      image: "ikiru.png",
    };
  } else {
    return {
      title: "生きるために食べる人",
      description: "食事は栄養補給。効率よく、健康に。",
      image: "ikiru.png",
    };
  }
}
