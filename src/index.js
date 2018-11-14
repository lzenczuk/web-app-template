function component() {
    let element = document.createElement('div');
    element.innerHTML = "Hello web pack";

    return element;
}

document.body.appendChild(component());
