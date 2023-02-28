'use strict';

{
  // 回答一覧
  const CORRECT_ANSWERS = [
    {
      index: 1,
      value: '約79万人'
    },
    {
      index: 2,
      value: 'X-TECH'
    },
    {
      index: 0,
      value: 'Internet of Things'
    },
    {
      index: 0,
      value: 'Society 5.0'
    },
    {
      index: 0,
      value: 'Web3.0'
    },
    {
      index: 1,
      value: '約5倍'
    }
  ];

  // すべての問題を取得
  const allQuiz  = document.querySelectorAll('.js-quiz');

  // buttonタグにdisabledを付与
  const setDisabled = answers => {
    answers.forEach(answer => {
      answer.disabled = true;
    })
  }
  // trueかfalseで出力する文字列を出し分ける
  //targetという仮引数を立てて何も入っていないものをinnerTextで取り出して　[isCorrectの関数に対する式（71行目）がtureなら'正解！'と表示しfalseなら'不正解...'と表示する] のを入れる（76行目でtargetにanswerTitleを当てはめる→js-answerTitleというクラス名がついているタグに[]の内容を適用）
  const setTitle = (target, isCorrect) => {
    target.innerText = isCorrect ? '正解！' : '不正解...';
  }
  //targetという仮引数を立てて｛isCorrectの関数に対する式（71行目）がtureなら'is-correct'と表示しfalseなら'is-incorrect'というクラス名をつける｝（79行目でtargetにanswerBoxを当てはめる→js-answerBoxというクラス名がついているタグに｛｝の内容を適用）
  const setClassName = (target, isCorrect) => {
    target.classList.add(isCorrect ? 'is-correct' : 'is-incorrect');
  }

  // 各問題の中での処理
  allQuiz.forEach(quiz => {
    const answers = quiz.querySelectorAll('.js-answer');
    const selectedQuiz = Number(quiz.getAttribute('data-quiz'));
    const answerBox = quiz.querySelector('.js-answerBox');
    const answerTitle = quiz.querySelector('.js-answerTitle');
    const answerText = quiz.querySelector('.js-answerText');

  //answersの中にある一つ一つの答えをanswerとしてそのそれぞれに{
    answers.forEach(answer => {
    //クリックしたら選んだ選択肢に{
      answer.addEventListener('click', () => {
        //'is-selected'というクラス名をつける＆data-answerという属性についている属性値を数字として取り出してselectedAnswerという関数をつくっていれる｝
        answer.classList.add('is-selected');
        const selectedAnswer = Number(answer.getAttribute('data-answer'));

        // 全てのボタンを非活性化
        setDisabled(answers);

        // 正解ならtrue, 不正解ならfalseをcheckCorrectに格納
        const isCorrect = CORRECT_ANSWERS[selectedQuiz].index === selectedAnswer;

        //正しい答えを表示
        answerText.innerText = CORRECT_ANSWERS[selectedQuiz].value;
        //正解不正解を表示
        setTitle(answerTitle, isCorrect);
        //正解ならjs-answerBoxに'is-correct'というクラス名をつけてそのクラス名に対応するcssを反映。
        //不正解ならjs-answerBoxに'is-incorrect'というクラス名をつけてそのクラス名に対応するcssを反映。
        setClassName(answerBox, isCorrect);
      })
    })
  })
}
