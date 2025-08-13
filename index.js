
const carousel = document.getElementById('carousel');
const grid = document.getElementById('grid');
const priorityRow = document.getElementById('priorityRow');
const unloadBtn = document.getElementById('unloadBtn');

const stack = [];
const priorityStack = [];


for (let i = 0; i < 3; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.addEventListener('dragover', e => e.preventDefault());
    cell.addEventListener('drop', e => {
        e.preventDefault();
        const id = e.dataTransfer.getData('text/plain');
        const pkg = document.getElementById(id);
        if (!pkg) return;
        const stored = document.createElement('div');
        stored.className = 'stored';
        cell.appendChild(stored);
        pkg.remove();
        priorityStack.push({cell, el: stored});
    });
    priorityRow.appendChild(cell);
}


for (let i = 0; i < 6; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.addEventListener('dragover', e => e.preventDefault());
    cell.addEventListener('drop', e => {
        e.preventDefault();
        const id = e.dataTransfer.getData('text/plain');
        const pkg = document.getElementById(id);
        if (!pkg) return;
        const stored = document.createElement('div');
        stored.className = 'stored';
        cell.appendChild(stored);
        pkg.remove();
        stack.push({cell, el: stored});
    });
    grid.appendChild(cell);
}

let pkgId = 0;
function spawnPackage() {
    const pkg = document.createElement('div');
    pkg.className = 'package';
    pkg.id = 'pkg-' + (++pkgId);
    pkg.draggable = true;
    pkg.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', pkg.id);
    });
    carousel.appendChild(pkg);
    setTimeout(() => pkg.remove(), 10000);
}

setInterval(spawnPackage, 1000);

unloadBtn.addEventListener('click', () => {
    if (priorityStack.length) {
        const last = priorityStack.pop();
        last.el.classList.add('removing');
        setTimeout(() => last.el.remove(), 500);
    } else if (stack.length) {
        const last = stack.pop();
        last.el.classList.add('removing');
        setTimeout(() => last.el.remove(), 500);
    }
});
