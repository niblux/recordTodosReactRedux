

// setTimeout((x) => console.log('h'), 1000)
// setTimeout((x) => console.log('he'), 2000);
// setTimeout((x) => console.log('hel'), 3000);
// setTimeout((x) => console.log('hell'), 4000);
// setTimeout((x) => console.log('hello'), 5000);
// setTimeout((x) => console.log('hello '), 6000);
// setTimeout((x) => console.log('hello b'), 7000);
// setTimeout((x) => console.log('hello b'), 8000);
// setTimeout((x) => console.log('hello ba'), 9000);
// setTimeout((x) => console.log('hello ban'), 10000);

// clearTimeout()

const timer = setTimeout((x) => console.log('h'), 1000);
setTimeout((x) => console.log('he'), 2000);
setTimeout((x) => console.log('hel'), 3000);
setTimeout((x) => console.log('hell'), 4000);
setTimeout((x) => console.log('hello'), 5000);

const stop = () => {
    window.addEventListener('click', clearTimeout(timer))
}

stop();

