let updateLineNumbers = (ta, el) => {
    let lines = ta.value.split('\n').length;
    let child_count = el.children.length;
    let difference = lines - child_count;

    if (difference > 0) {
        let frag = document.createDocumentFragment();
        while (difference > 0) {
            let line_number = document.createElement('span');
            line_number.className = 'ise-line';
            frag.appendChild(line_number);
            difference--;
        }
        el.appendChild(frag);
    } else if (difference < 0) {
        while (difference < 0) {
            el.removeChild(el.firstChild);
            difference++;
        }
    }
}

let createTextAreaWithLineNumbers = (id) => {
    let ta = document.getElementById(id);
    if (ta == null) {
        return console.warn(`Couldn't find textarea of id ${id}`);
    }
    if (ta.className.indexOf('ise-active') != -1) {
        return console.warn(`textarea of id ${id} is already numbered`);
    }
    ta.classList.add('ise-active');
    ta.style = {};

    let el = document.createElement('div');
    ta.parentNode.insertBefore(el, ta);
    el.className = 'ise-wrapper';
    updateLineNumbers(ta, el);

    ta.onpropertychange = ta.oninput = ta.onkeydown = ta.onkeyup = function (ta, el) {
        return function (e) {
            if ((e.keyCode == 36 || e.which == 36 || e.code == 'Home' || e.key == 'Home')
                || e.keyCode == 13 || e.which == 13 || e.code == 'Enter'
                || e.code == 'NumpadEnter' || e.key == 'Enter')
                ta.scrollLeft = 0;
            updateLineNumbers(ta, el);
        }
    }(ta, el);
    ta.onchange = ta.onmousewheel = ta.onscroll = function (ta, el) {
        return function () { el.scrollTop = ta.scrollTop; }
    }(ta, el);
}

