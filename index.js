//Grabbing input and division with id of name
const inName = document.querySelector('#name');
const div1 = document.querySelector('#set-name');

//Grabbing the main for appending each division element
const main = document.querySelector('main')

inName.focus();

//define a function to introduce and ask for age
function introduce() {
    const para = document.createElement('p');
    para.textContent = `Hello, ${inName.value[0].toUpperCase() +
         inName.value.slice(1).toLowerCase()}. What is your age?`;

    return div1.appendChild(para);
}

//create promise that returns the introduce function on resolution
const introduction = (user) => {
    return new Promise((resolve) => { 
        resolve(introduce());
     }) }

//create promise that listens for name input and resolves the introduction promise
//set promise to, upon resolution, build the HTML elements for accepting age input
const nameIntro = () =>  {
    return new Promise(resolve => {
        inName.addEventListener('change', (data) => {
            resolve(introduction(data)
                .then((data) => {
                    buildAge(data);
                }))
            })
        })
    }

//call the promise listener that resolves the introduction and then builds
//the HTML elements for accepting age input. THEN, define a function to grab
//input and division with id of age, add a listener, and output the age text.
nameIntro()
    .then(() => {
        const inAge = document.querySelector('#age');
        const div2 = document.querySelector('#set-age');
        inAge.focus();
        inAge.addEventListener('change', () => {
            const para = document.createElement('p');
            para.textContent = `You have set your age to ${inAge.value} 
                years old. What is your favorite color?`;
            div2.appendChild(para);
            setBgColor();
            //defining color variables and setting up event listener
            const inColor = document.querySelector('#color');
            const div3 = document.querySelector('#set-color');
            inColor.focus();
            inColor.addEventListener('change', () => {
                const para = document.createElement('p');
                para.textContent = `You have set the background color to
                    ${inColor.value}.`
                div3.appendChild(para);
                //setting background color
                main.style.backgroundColor = inColor.value;
                if (main.style.backgroundColor === 'black' || main.style.backgroundColor === 'darkblue') {
                    main.style.color = 'white';
                } else {
                    main.style.color = 'black';
                }
                //creating user profile
                const para2 = document.createElement('p');
                para2.setAttribute('id', 'user-profile');
                para2.textContent = `Ok ${inName.value}, your username is ${inName.value.toLowerCase()}_theUser,
                    your age is ${inAge.value}, and your favorite color ${inColor.value} will
                    be used for the background color. `;
                main.appendChild(para2);
            })
            
        })
    })

const setBgColor = () => {
    return new Promise(resolve => {
        resolve(buildColor())
})}

//defining the function to build the HTML elements for accepting age input.
function buildAge() {
    const div2 = document.createElement('div');
    div2.setAttribute('id', 'set-age');

    const label = document.createElement('label');
    label.setAttribute('for', 'age');
    label.textContent = 'Enter your age:';

    const inAge = document.createElement('input');
    inAge.setAttribute('id', 'age');
    inAge.setAttribute('type', 'number');
    inAge.setAttribute('placeholder', 'enter age');

    div2.appendChild(label);
    div2.appendChild(inAge);
    main.appendChild(div2);
}

function buildColor() {
    const div3 = document.createElement('div');
    div3.setAttribute('id', 'set-color');

    const label = document.createElement('label');
    label.setAttribute('for', 'color');
    label.textContent = 'Enter your favorite color:';

    const inColor = document.createElement('input');
    inColor.setAttribute('id', 'color');
    inColor.setAttribute('type', 'string');
    inColor.setAttribute('placeholder', 'enter color');

    div3.appendChild(label);
    div3.appendChild(inColor);
    main.appendChild(div3);
}