'use strict';

{
  /**
   * @typedef QUIZ
   * @property {number} correctNumber 問題番号
   * @property {string | undefined} note ノート
   * @property {string} question 問題文
   * @property {string[]} answers 回答の配列
   */

  /**
   * @description 問題と回答の定数
   * @type {QUIZ[]}
   */
  const ALL_QUIZ = [
    {
      id: 1,
      question: '日本のIT人材が2030年には最大どれくらい不足すると言われているでしょうか？',
      answers: ['約28万人', '約79万人', '約183万人'],
      correctNumber: 1,
      note: '経済産業省 2019年3月 － IT 人材需給に関する調査'
    },
    {
      id: 2,
      question: '既存業界のビジネスと、先進的なテクノロジーを結びつけて生まれた、新しいビジネスのことをなんと言うでしょう？',
      answers: ['INTECH', 'BIZZTECH', 'X-TECH'],
      correctNumber: 2,
    },
    {
      id: 3,
      question: 'IoTとは何の略でしょう？',
      answers: ['Internet of Things', 'Integrate into Technology', 'Information on Tool'],
      correctNumber: 0,
    },
    {
      id: 4,
      question: 'イギリスのコンピューター科学者であるギャビン・ウッド氏が提唱した、ブロックチェーン技術を活用した「次世代分散型インターネット」のことをなんと言うでしょう？',
      answers: ['Society 5.0', 'CyPhy', 'SDGs'],
      correctNumber: 0,
      note: 'Society5.0 - 科学技術政策 - 内閣府'
    },
    {
      id: 5,
      question: 'イギリスのコンピューター科学者であるギャビン・ウッド氏が提唱した、ブロックチェーン技術を活用した「次世代分散型インターネット」のことをなんと言うでしょう？',
      answers: ['Web3.0', 'NFT', 'メタバース'],
      correctNumber: 0,
    },
    {
      id: 6,
      question: '先進テクノロジー活用企業と出遅れた企業の収益性の差はどれくらいあると言われているでしょうか？',
      answers: ['約2倍', '約5倍', '約11倍'],
      correctNumber: 1,
      note: 'Accenture Technology Vision 2021'
    }
  ];

  /**
   * @description クイズコンテナーの取得
   * @type {HTMLElement}
   */
  const quizContainer = document.getElementById('js-quizContainer');

  /**
   * @description クイズ１つ１つのHTMLを生成するための関数
   * @param quizItem { QUIZ }
   * @param questionNumber { number }
   * @returns {string}
   */
  const createQuizHtml = (quizItem, questionNumber) => {

    /**
     * @description 回答の生成
     * @type {string}
     */
    const answersHtml = quizItem.answers.map((answer, answerIndex) => `<li class="p-quiz-box__answer__item">
        <button class="p-quiz-box__answer__button js-answer" data-answer="${answerIndex}">
          ${answer}<i class="u-icon__arrow"></i>
        </button>
      </li>`
    ).join('');

    // 引用テキストの生成
    const noteHtml = quizItem.note ? `<cite class="p-quiz-box__note">
      <i class="u-icon__note"></i>${quizItem.note}
    </cite>` : '';

    return `<section class="p-quiz-box js-quiz" data-quiz="${questionNumber}">
      <div class="p-quiz-box__question">
        <h2 class="p-quiz-box__question__title">
          <span class="p-quiz-box__label">Q${questionNumber + 1}</span>
          <span
            class="p-quiz-box__question__title__text">${quizItem.question}</span>
        </h2>
        <figure class="p-quiz-box__question__image">
          <img src="../assets/img/quiz/img-quiz0${quizItem.id}.png" alt="">
        </figure>
      </div>
      <div class="p-quiz-box__answer">
        <span class="p-quiz-box__label p-quiz-box__label--accent">A</span>
        <ul class="p-quiz-box__answer__list">
          ${answersHtml}
        </ul>
        <div class="p-quiz-box__answer__correct js-answerBox">
          <p class="p-quiz-box__answer__correct__title js-answerTitle"></p>
          <p class="p-quiz-box__answer__correct__content">
            <span class="p-quiz-box__answer__correct__content__label">A</span>
            <span class="js-answerText"></span>
          </p>
        </div>
      </div>
      ${noteHtml}
    </section>`
  }

  /**
   * @description 配列の並び替え
   * @param arrays {Array}
   * @returns {Array}
   */
  const shuffle = arrays => {
    /* sliceは配列の中の任意の要素を取り出すことができる（文字列の中の任意の文字でも可）。 
    ex:slice(1,3)は配列の中の2番目と4番目を取り出す（配列は0番から数え始めるから）*/
    const array = arrays.slice();
    /* lengthは要素の数を数えるから一個目の要素を１と数える。が、配列は一個目を0と数えるため  -1をして0から数える方に合わせている。 */
    for (let i = array.length - 1; i >= 0; i--) {
    /* Math.floorは小数点以下切り捨て
      Math.random()*(最大値＋1)は範囲を決めてその中で乱数を作成する。*/
      const randomIndex = Math.floor(Math.random() * (i + 1));
      /* １．配列の一番後ろと乱数を入れ替える
      　→乱数の位置に配列を設置（3が出たら3問目に置く）
      　　２．配列全てに乱数を適応するまで繰り返す
      */
      [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array
  }

  /**
   * @description quizArrayに並び替えたクイズを格納
   * @type {Array}
   */
  const quizArray = shuffle(ALL_QUIZ)

  /**
   * @type {string}
   * @description 生成したクイズのHTMLを #js-quizContainer に挿入
   */
  /*62行目でつくったquizContainer（唯一index.htmlから取り出してつくった関数）の中を取り出して（何も入ってないものを取り出したから書き換えるとかではなく、何も書いていないところに書いていく）
  quizArrayのそれぞれにquizItemという名前をつけてindexで番号をつける*/
  quizContainer.innerHTML = quizArray.map((quizItem, index) => {
    return createQuizHtml(quizItem, index)
  }).join('')

  /**
   * @type {NodeListOf<Element>}
   * @description すべての問題を取得
   */
  const allQuiz  = document.querySelectorAll('.js-quiz');

  /**
   * @description buttonタグにdisabledを付与
   * @param answers {NodeListOf<Element>}
   */
  const setDisabled = answers => {
    answers.forEach(answer => {
      answer.disabled = true;
    })
  }

  /**
   * @description trueかfalseで出力する文字列を出し分ける
   * @param target {Element}
   * @param isCorrect {boolean}
   */
  //targetという仮引数を立てて何も入っていないものをinnerTextで取り出して [isCorrectの関数に対する式（211行目）がtureなら'正解！'と表示しfalseなら'不正解...'と表示する] のを入れる（215行目でtargetにanswerTitleを当てはめる→js-answerTitleというクラス名がついているタグに[]の内容を適用）
  const setTitle = (target, isCorrect) => {
    target.innerText = isCorrect ? '正解！' : '不正解...';
  }

  /**
   * @description trueかfalseでクラス名を付け分ける
   * @param target {Element}
   * @param isCorrect {boolean}
   */
   //targetという仮引数を立てて｛isCorrectの関数に対する式（211行目）がtureなら'is-correct'と表示しfalseなら'is-incorrect'というクラス名をつける｝（216行目でtargetにanswerBoxを当てはめる→js-answer
  const setClassName = (target, isCorrect) => {
    target.classList.add(isCorrect ? 'is-correct' : 'is-incorrect');
  }

  /**
   * 各問題の中での処理
   */
  allQuiz.forEach(quiz => {
    const answers = quiz.querySelectorAll('.js-answer');
    const selectedQuiz = Number(quiz.getAttribute('data-quiz'));
    const answerBox = quiz.querySelector('.js-answerBox');
    const answerTitle = quiz.querySelector('.js-answerTitle');
    const answerText = quiz.querySelector('.js-answerText');

    answers.forEach(answer => {
      answer.addEventListener('click', () => {
        answer.classList.add('is-selected');
        const selectedAnswerNumber = Number(answer.getAttribute('data-answer'));

        // 全てのボタンを非活性化
        setDisabled(answers);

        // 正解ならtrue, 不正解ならfalseをcheckCorrectに格納
        const correctNumber = quizArray[selectedQuiz].correctNumber
        const isCorrect = correctNumber === selectedAnswerNumber;

        // 回答欄にテキストやclass名を付与
        answerText.innerText = quizArray[selectedQuiz].answers[correctNumber];
        setTitle(answerTitle, isCorrect);
        setClassName(answerBox, isCorrect);
      })
    })
  })
}
