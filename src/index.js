const downloadButton = document.querySelector('.download-button');
const input = document.querySelector('.input');
const image = document.querySelector('.image');
const canvas = document.querySelector('.canvas');

function draw(num) {
    const text = num + ' ' + 'рублей?';
    const context = canvas.getContext('2d');

    const imageObj = new Image();
    imageObj.src = image.src;
    imageObj.crossOrigin = 'anonymous';

    imageObj.onload = function () {
        canvas.width = this.naturalWidth;
        canvas.height = this.naturalHeight;

        context.drawImage(imageObj, 0, 0);
        context.fillStyle = 'white';
        context.font = 'bold 46px Calibri';
        context.shadowColor = 'black';
        context.shadowOffsetX = 3;
        context.shadowOffsetY = 3;
        context.shadowBlur = 4;
        context.fillText(text, 150, 480);
    };
}

function handleDownload() {
    const link = document.createElement('a');
    link.download = 'yest-rubli';
    link.href = canvas.toDataURL('image/png;base64;');
    link.click();
    link.delete;
}

window.onload = () => draw(0);

downloadButton.addEventListener('click', handleDownload);

input.addEventListener('input', e => {
    console.log(e.target.value);
    draw(e.target.value);
});
