const downloadButton = document.querySelector('.download-button');
const input = document.querySelector('.input');
const image = document.querySelector('.image');
const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');

// отрисовка картинки с текстом
function draw(num) {
    const imageObj = new Image();

    const text = checkDeclension(num);

    imageObj.src = image.src;
    imageObj.crossOrigin = 'anonymous';

    imageObj.onload = function () {
        canvas.width = this.naturalWidth;
        canvas.height = this.naturalHeight;

        context.drawImage(imageObj, 0, 0);
        // стили текста
        context.fillStyle = 'white';
        context.font = '600 55px Microsoft Sans Serif';
        context.shadowColor = 'black';
        context.shadowOffsetX = 3;
        context.shadowOffsetY = 3;
        context.shadowBlur = 4;
        // вставка текста
        context.fillText(text, 144, 480);
    };
}

// обработчик скачивания
function handleDownload() {
    const link = document.createElement('a');
    link.download = 'yest-rubli';
    link.href = canvas.toDataURL('image/png;base64;');
    link.click();
    link.delete;
}

// проверка склонения
function checkDeclension(num) {
    const lastDigit = num % 10;
    let text;

    if (num && num.length > 11) {
        return 'дохуя рублей?';
    }

    if (
        (lastDigit === 0 && num) ||
        (lastDigit > 4 && lastDigit < 10) ||
        (num > 9 && num < 20)
    ) {
        text = num + ' ' + 'рублей?';
    } else if (lastDigit === 1) {
        text = num + ' ' + 'рубль?';
    } else if (lastDigit > 1 && lastDigit < 5) {
        text = num + ' ' + 'рубля?';
    } else {
        text = 'рубли?';
    }

    return text;
}

//слушатель ввода
input.addEventListener('input', e => {
    draw(e.target.value);
});
// слушатель кнопки скачивания
downloadButton.addEventListener('click', handleDownload);

// рендер при загузке страницы
window.onload = () => draw();
