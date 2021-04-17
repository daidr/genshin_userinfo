(function () {
    const typeName = {
        "Reputation": "声望等级：",
        "Offering": "供奉等级：",
    }
    class WorldCard extends HTMLElement {
        constructor() {
            super();

            const shadow = this.attachShadow({ mode: 'open' });

            const world = document.createElement('article');
            world.setAttribute('class', 'media');

            const mediaLeft = document.createElement('div');
            mediaLeft.setAttribute('class', 'media-left');

            const mediaContent = document.createElement('div');
            mediaContent.setAttribute('class', 'media-content');

            const figure = document.createElement('figure');

            const img = document.createElement('img');
            img.src = this.getAttribute('icon');

            const content = document.createElement('div');
            content.setAttribute('class', 'content');

            const p = document.createElement('p');

            let temp = document.createElement('strong');
            temp.innerText = this.getAttribute('name');
            p.appendChild(temp);

            temp = document.createElement('br');
            p.appendChild(temp);

            temp = document.createElement('span');
            temp.innerText = "探索度：" + (this.getAttribute('exploration_percentage') / 10) + "%";
            p.appendChild(temp);

            temp = document.createElement('br');
            p.appendChild(temp);

            temp = document.createElement('span');
            temp.innerText = typeName[this.getAttribute('type')] + this.getAttribute('level');
            p.appendChild(temp);

            content.appendChild(p);

            const style = document.createElement('style');
            style.textContent = `
* {
    box-sizing: border-box;
    color: #fffcf3;
}
.media {
    align-items: center;
    display: flex;
    text-align: inherit;
}
.media-left {
    flex-basis: auto;
    flex-grow: 0;
    flex-shrink: 0;
    margin-right: 1rem;
    width: 75px;
}
figure {
    height: 85px;
    width: 85px;
    margin: 0;
}
figure img {
    display: block;
    height: auto;
    width: 100%;
    pointer-events: none;
    user-select: none;
    -webkit-filter: drop-shadow(0 0 3px rgb(184 179 164));
    filter: drop-shadow(0 0 3px rgb(184 179 164));
}
.media-content {
    flex-basis: auto;
    flex-grow: 1;
    flex-shrink: 1;
    text-align: inherit;
    -webkit-filter: drop-shadow(0 0 3px rgb(184 179 164));
    filter: drop-shadow(0 0 3px rgb(184 179 164));
}
::selection {
    background: #eee3c5;
    color: #afa68c;
}
    `;

            shadow.appendChild(style);
            shadow.appendChild(world);

            mediaLeft.appendChild(figure);
            figure.appendChild(img);

            mediaContent.appendChild(content);

            world.appendChild(mediaLeft);
            world.appendChild(mediaContent);
        }
    }
    customElements.define('world-card', WorldCard);
})()