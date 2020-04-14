const onChange = (objToWatch, onChangeFunction) => {
    const handler = {
        get(target, property, receiver) {
            onChangeFunction();
            console.log('i am getting', target[property]);
            return Reflect.get(target, property, receiver);
        },
        set(target, property, value) {
            onChangeFunction();
            console.log('i am setting', target[property]);
            return Reflect.set(target, property, value);
        },
        deleteProperty(target, property) {
            onChangeFunction();
            console.log('i am deleting', target[property]);
            return Reflect.deleteProperty(target, property);
        }
    };
    return new Proxy(objToWatch, handler);
};

const todos = [{ id: 1, name: 'donna', value: 'do stuff' }, { id: 2, name: 'nabs', value: 'do more stuff' }]

const todoProxy = onChange(todos, () => console.log());

todoProxy.push({ id: 3, name: 'noah', value: 'love daddy and mummy' });
todoProxy.pop();
todoProxy[1].name = 'noah baby';