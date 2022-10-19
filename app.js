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
    } else if (type === 'copy') {
        copyToClickboard(event.target.textContent);
    }
})

// генератор ХЕКС кольора   // chroma.random()
function generateRandomColor() {
    const hexCodes = '123456789ABCDEF';
    let color ='';
    for (let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    };
    return '#' + color;
}

function copyToClickboard(text) {
    return navigator.clipboard.writeText(text);
}

function setRandomColors(isInitial) {
    const colors = isInitial ? getColorsFromHash() : [];

cols.forEach((col, index) => {
    const isLocked = col.querySelector('i').classList.contains('fa-lock'); // перевірка чи заблокована колонка;
    const text = col.querySelector('h2');  // перевірка кольору напису
    const button = col.querySelector('button');  //перевірка кольору кнопки
    
    if (isLocked) {
          
        colors.push(text.textContent)
        return; // блокировка зміни кольору
    }  

    const color = isInitial ? colors[index] ? colors[index] : generateRandomColor() : generateRandomColor(); // chroma.random()

    colors.push(color)

    text.textContent = color;      // зміна тексту 
    col.style.background = color;  //зміна кольору

    setTextColor(text, color);  // зміна кольору тексту
    setTextColor(button, color);   //зніна кольору іконки кнопки
})

updateColorsHash(colors);
}

// функція зміни кольору текста
function setTextColor(text, color) {
 const luminance = chroma(color).luminance();
 text.style.color = luminance > 0.5 ? 'black' : 'white';
}

function updateColorsHash(colors = []) {
    document.location.hash = colors.map((col) => col.toString().substring(1)).join('-');
}

function getColorsFromHash() {
    if (document.location.hash.length > 1) {
       return document.location.hash.substring(1).split('-').map(color => '#' + color);
    }
    return [];
}

setRandomColors(true)