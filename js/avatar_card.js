(function () {
    function genStar(number) {
        return "★".repeat(number)
    }
    class AvatarCard extends HTMLElement {
        constructor() {
            super();

            const shadow = this.attachShadow({ mode: 'open' });

            const avatar = document.createElement('article');
            avatar.setAttribute('class', 'media');

            const mediaLeft = document.createElement('div');
            mediaLeft.setAttribute('class', 'media-left');

            const mediaContent = document.createElement('div');
            mediaContent.setAttribute('class', 'media-content');

            const figure = document.createElement('figure');

            const img = document.createElement('img');
            img.src = this.getAttribute('image');

            const content = document.createElement('div');
            content.setAttribute('class', 'content');

            const p = document.createElement('p');

            let temp = document.createElement('strong');
            temp.innerText = `${this.getAttribute('name')}(${this.getAttribute('actived_constellation_num')}命)`;
            p.appendChild(temp);

            temp = document.createElement('br');
            p.appendChild(temp);

            temp = document.createElement('small');
            temp.innerText = this.getAttribute('element')+" ";
            p.appendChild(temp);

            temp = document.createElement('small');
            temp.innerText = genStar(this.getAttribute('rarity'));
            p.appendChild(temp);

            temp = document.createElement('br');
            p.appendChild(temp);

            temp = document.createElement('span');
            temp.innerText = "等级：" + this.getAttribute('level');
            p.appendChild(temp);

            temp = document.createElement('br');
            p.appendChild(temp);

            temp = document.createElement('span');
            temp.innerText = "好感度：" + this.getAttribute('fetter');
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
    position:relative;
}
figure img {
    display: block;
    height: auto;
    width: 100%;
    filter: saturate(0.6);
    pointer-events: none;
    user-select: none;
}
.media-content {
    flex-basis: auto;
    flex-grow: 1;
    flex-shrink: 1;
    text-align: inherit;
    -webkit-filter: drop-shadow(0 0 3px rgb(184 179 164));
    filter: drop-shadow(0 0 3px rgb(184 179 164));
}
figure:after{
  position:absolute;
  content:'';
  top:0;
  left:0;
  right:0;
  bottom:0;
  box-shadow:0 -9px 12px 10px #daceac inset;
}
::selection {
    background: #eee3c5;
    color: #afa68c;
}
    `;

            shadow.appendChild(style);
            shadow.appendChild(avatar);

            mediaLeft.appendChild(figure);
            figure.appendChild(img);

            mediaContent.appendChild(content);

            avatar.appendChild(mediaLeft);
            avatar.appendChild(mediaContent);
        }
    }
    customElements.define('avatar-card', AvatarCard);
})()
