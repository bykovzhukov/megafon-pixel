/**
 * Все текстовые значения рекомендуется хранить здесь
 */
export default {
    title: 'Картинка не загрузилась',
    description: 'Угадайте, что изображено на пиксельном изображении',
    questions: [{
        title: '',
        msg: 'Это зелёный лого «Мегафона»',
        images: [{
            img: 'img/q/1/1.png',
            img2x: 'img/q/1/1.png',
        }, {
            img: 'img/q/1/2.png',
            img2x: 'img/q/1/2.png',
        }, {
            img: 'img/q/1/3.png',
            img2x: 'img/q/1/3.png',
        }, {
            img: 'img/q/1/4.png',
            img2x: 'img/q/1/4.png',
        }],
        options: [{
            text: 'Зелёный лого «Мегафона»',
            isCorrect: true
        }, {
            text: 'Whats App'
        }, {
            text: 'Деливери'
        }, {
            text: 'Старбакс'
        }]
    }, {
        title: '',
        msg: 'Это Лада',
        images: [{
            img: 'img/q/2/1.png',
            img2x: 'img/q/2/1.png',
        }, {
            img: 'img/q/2/2.png',
            img2x: 'img/q/2/2.png',
        }, {
            img: 'img/q/2/3.png',
            img2x: 'img/q/2/3.png',
        }, {
            img: 'img/q/2/4.png',
            img2x: 'img/q/2/4.png',
        }],
        options: [{
            text: 'Лада',
            isCorrect: true
        }, {
            text: 'BMW'
        }, {
            text: 'Audi'
        }, {
            text: 'Jaguar'
        }]
    }, {
        title: '',
        msg: 'Это купюра 10 рублей',
        images: [{
            img: 'img/q/3/1.png',
            img2x: 'img/q/3/1.png',
        }, {
            img: 'img/q/3/2.png',
            img2x: 'img/q/3/2.png',
        }, {
            img: 'img/q/3/3.png',
            img2x: 'img/q/3/3.png',
        }, {
            img: 'img/q/3/4.png',
            img2x: 'img/q/3/4.png',
        }],
        options: [{
            text: '100 долларов'
        }, {
            text: '200 шекелей'
        }, {
            text: '100 рублей'
        }, {
            text: '10 рублей',
            isCorrect: true
        }]
    }, {
        title: 'Кто изображен на картинке?',
        msg: 'Это Павел Дуров с голым торсом.',
        images: [{
            img: 'img/q/10/1.jpg',
            img2x: 'img/q/10/1@2x.jpg',
        }, {
            img: 'img/q/10/2.jpg',
            img2x: 'img/q/10/2@2x.jpg',
        }, {
            img: 'img/q/10/3.jpg',
            img2x: 'img/q/10/3@2x.jpg',
        }, {
            img: 'img/q/10/4.jpg',
            img2x: 'img/q/10/4@2x.jpg',
        }],
        options: [{
            text: 'Лысый из Brazzers'
        }, {
            text: 'Лысая собака'
        }, {
            text: 'Дуров с голым торсом',
            isCorrect: true
        }, {
            text: 'Коленка'
        }]
    }],
    results: [{
        index: 1,
        range: [0,3],
        text: 'Эти три пикселя — нос?',
        img: 'img/result/3.jpg',
        img2x: 'img/result/3@2x.jpg'
    }, {
        index: 2,
        range: [4,7],
        text: 'Догружаю картинки в&nbsp;голове',
        img: 'img/result/2.jpg',
        img2x: 'img/result/2@2x.jpg'
    }, {
        index: 3,
        range: [8,10],
        text: 'Статус: Растрамен',
        img: 'img/result/3.jpg',
        img2x: 'img/result/3@2x.jpg'
    }]
};