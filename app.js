const cols = document.querySelectorAll('.col');

//слухач пробілу для змини кольорів
document.addEventListener('keydown', (event) => {
    event.preventDefault()
    if (event.code.toLowerCase() === 'space') {
        setRandomColors()
    };
    // console.log(event.code);
});

// слухач клику по кнопці замка
document.addEventListener('click', event => {
    const type = event.target.dataset.type
    // console.log(event.target.dataset);

    //переверка класу на кнопці
    if (type === 'lock') {
        // console.log('perform lock');
        const node = event.target.tagName.toLowerCase() === 'i' ? event.target : event.target.children[0];
        // console.log(node);

        node.classList.toggle('fa-lock-open');  //зміна класу на розблок.
        node.classList.toggle('fa-lock');   //зміна класу на блок.
    }
})

// генератор ХЕКС кольора
function generateRandomColor() {
    const hexCodes = '123456789ABCDEF';
    let color ='';
    for (let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    };
    return '#' + color;
}

function setRandomColors() {
cols.forEach((col) => {
    const isLocked = col.querySelector('i').classList.contains('fa-lock'); // перевірка чи заблокована колонка;
    const text = col.querySelector('h2');  // перевірка кольору напису
    const button = col.querySelector('button');  //перевірка кольору кнопки
    const color =  generateRandomColor();

    if (isLocked) {return}  // блокировка зміни кольору

    text.textContent = color;      // зміна тексту 
    col.style.background = color;  //зміна кольору

    setTextColor(text, color);  // зміна кольору тексту
    setTextColor(button, color);   //зніна кольору іконки кнопки
})
}

// функція зміни кольору текста
function setTextColor(text, color) {
 const luminance = chroma(color).luminance();
 text.style.color = luminance > 0.5 ? 'black' : 'white';
}

setRandomColors()