export const listItem = value => `<li class="app-list__item"><span>${value}</span> <a href="#" class="app-list__remove">X</a></li>`;

export const createInput = value => `<input type="text" value="${value}">`;

export const formHtml = () => {
    return `
            <form class="app-form">
                <input type="text" placeholder="Input name" class="app-form__input">
                <button class="app-form__btn">Create</button>
            </form>
    `;
};