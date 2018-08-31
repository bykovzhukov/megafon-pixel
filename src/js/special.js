import '../css/special.styl';

import BaseSpecial from './base';
import Data from './data';
import Svg from './svg';
import * as Share from './lib/share';
import * as Analytics from './lib/analytics';
import { makeElement, removeChildren } from './lib/dom';
import { shuffle } from './lib/array';
import { animate } from './lib/animate';

const CSS = {
    main: 'MegafonPixel',
};

const EL = {};

const IMAGES = {};

class Special extends BaseSpecial {
    constructor(params = {}) {
        super();

        Object.assign(this.params, params);
        this.saveParams();

        if (Data && params.data) {
            Object.assign(Data, params.data);
        }

        if (this.params.css) {
            this.loadStyles(this.params.css).then(() => this.init());
        } else {
            this.init();
        }
    }

    createElements() {
        EL.q = makeElement('div', CSS.main + '-q');
        EL.qHeader = makeElement('div', CSS.main + '-q__header');
        EL.qTitle = makeElement('div', CSS.main + '-q__title');
        EL.qPages = makeElement('div', CSS.main + '-q__pages', {
            innerHTML: Svg.img
        });
        EL.qPagesText = makeElement('span');
        EL.qFigure = makeElement('div', CSS.main + '-q__figure');
        EL.qFigureBound = makeElement('div', CSS.main + '-q__figure-bound', {
            innerHTML: '<span></span><span></span><span></span><span></span>'
        });
        EL.qFigureImg = makeElement('img', CSS.main + '-q__figure-img');
        EL.qOptions = makeElement('div', CSS.main + '-q__options');

        EL.qAnswer = makeElement('div', CSS.main + '-q__answer');
        EL.qAnswerTitle = makeElement('div', CSS.main + '-q__answer-title');
        EL.qAnswerText = makeElement('div', CSS.main + '-q__answer-text');
        EL.qBtn = makeElement('div', CSS.main + '-q__next-btn');
        EL.qNextBtn = makeElement('button', CSS.main + '-btn', {
            innerHTML: '<span class="' + CSS.main + '-btn__icon">' + Svg.arrow + '</span>',
            data: {
                caption: 'Продолжить',
                click: 'continue'
            }
        });
        EL.qResultBtn = makeElement('button', CSS.main + '-btn', {
            innerHTML: '<span class="' + CSS.main + '-btn__icon">' + Svg.arrow + '</span>',
            data: {
                caption: 'Результат',
                click: 'showResult'
            }
        });

        EL.qPages.appendChild(EL.qPagesText);

        EL.qHeader.appendChild(EL.qTitle);
        EL.qHeader.appendChild(EL.qPages);

        EL.qFigure.appendChild(EL.qFigureBound);
        EL.qFigure.appendChild(EL.qFigureImg);

        EL.qBtn.appendChild(EL.qNextBtn);

        EL.qAnswer.appendChild(EL.qAnswerTitle);
        EL.qAnswer.appendChild(EL.qAnswerText);
        EL.qAnswer.appendChild(EL.qBtn);

        EL.q.appendChild(EL.qHeader);
        EL.q.appendChild(EL.qFigure);
        EL.q.appendChild(EL.qOptions);
    }

    storeImages(data) {
        let img;

        data.forEach((item, i) => {
            IMAGES[i] = [];

            item.images.forEach((it, j) => {
                img = document.createElement('img');
                img.src = it.img;
                img.srcset = it.img2x + ' 2x';
                IMAGES[i][j] = { 'img': img };
            });
        });
    }

    setImage(obj) {
        EL.qFigureImg.src = obj.img;
        EL.qFigureImg.srcset = obj.img2x + ' 2x';
    }

    setPages() {
        EL.qPagesText.textContent = (this.activeIndex + 1) + '/' + Data.questions.length;
    }

    makeOptions(options) {
        removeChildren(EL.qOptions);

        options = options.map((item, i) => { item.id = i; return item; });
        shuffle(options);
        options.forEach(item => {
            let optionWrap = makeElement('div', CSS.main + '-q__options-item');
            let option = makeElement('button', CSS.main + '-btn', {
                data: {
                    id: item.id,
                    caption: item.text,
                    click: 'checkAnswer'
                }
            });
            optionWrap.appendChild(option);

            EL.qOptions.appendChild(optionWrap);
        });
    }

    makeNextQuestion() {
        let question = Data.questions[this.activeIndex];

        EL.qTitle.textContent = question.title;

        this.setImage(question.images[0]);

        this.makeOptions(question.options);

        this.setPages();
    }

    checkAnswer(el, e) {
        if (el.dataset.answered) { return; }

        let id = el.dataset.id,
            question = Data.questions[this.activeIndex];

        this.currentAttempts++;

        if (question.options[id].isCorrect) {
            if (this.currentAttempts === 1) {
                this.correctAnswers++;
                this.showAnswer(true);
            } else {
                this.showAnswer(undefined);
            }

        } else {
            el.dataset.answered = true;
            el.classList.add('is-wrong');

            this.setImage(question.images[this.currentAttempts]);

            if (this.currentAttempts > 2) {
                this.showAnswer(false);
            }
        }
    }

    showAnswer(isCorrect) {
        let question = Data.questions[this.activeIndex];

        this.setImage(question.images[3]);

        EL.q.removeChild(EL.qOptions);
        EL.q.appendChild(EL.qAnswer);

        EL.qAnswerTitle.textContent = isCorrect === undefined ? 'С первого раза не угадали.' : isCorrect ? 'Правильно!' : 'Неправильно.';
        EL.qAnswerText.innerHTML = question.msg;

        if (this.activeIndex >= Data.questions.length - 1) {
            EL.qBtn.removeChild(EL.qNextBtn);
            EL.qBtn.appendChild(EL.qResultBtn);
        }
    }

    continue() {
        this.currentAttempts = 0;
        this.activeIndex++;

        EL.q.removeChild(EL.qAnswer);
        EL.q.appendChild(EL.qOptions);

        this.makeNextQuestion();
    }

    showResult() {
        console.log(this.correctAnswers);

        this.restart();
    }

    restart() {
        this.setInitialParamas();

        removeChildren(this.container);
        this.container.appendChild(EL.q);

        EL.q.removeChild(EL.qAnswer);
        EL.q.appendChild(EL.qOptions);

        EL.qBtn.removeChild(EL.qResultBtn);
        EL.qBtn.appendChild(EL.qNextBtn);

        this.makeNextQuestion();
    }

    start() {
        removeChildren(this.container);
        this.container.appendChild(EL.q);

        this.container.classList.add(CSS.main + '--q');

        animate(EL.qHeader, 'fadeInDown', '200ms', '200ms');
        animate(EL.qFigure, 'fadeInDown', '400ms');
        animate(EL.qOptions, 'fadeInUp', '400ms');

        this.makeNextQuestion();
    }

    setInitialParamas() {
        this.activeIndex = 0;
        this.correctAnswers = 0;
        this.currentAttempts = 0;
    }

    init() {
        this.setInitialParamas();

        this.createElements();

        this.storeImages(Data.questions);

        if (this.params.startBtn) {
            this.params.startBtn.addEventListener('click', () => {
                this.start();
            }, { once: true});
        }
    }
}

export default Special;