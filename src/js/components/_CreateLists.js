import {listItem, createInput, formHtml} from './_html';

export default class TODO {
    constructor() {

        this.init();

    }

    createApp() {

        const _this = this;

        const wrap = $(document).find('.app');

        if(wrap.length > 0) {

            wrap.append(formHtml());

            wrap.append(`
            <ul class="app-list"></ul>
            `);

            _this.checkStorage();

        }

    }

    appendListItem(value) {

        const _this = this;

        const list = $(document).find('.app-list');

        if(value) {

            list.prepend(listItem(value));

            _this.saveInStorage();

        }

    }

    changeInputVal($input) {

        const _this = this;

        if($input) {

            const val = $input.val().trim();

            if(val.length>0) {

                $input.removeClass('error');

                _this.appendListItem(val);

                $input.val('');

            }else {

                $input.addClass('error');

            }
        }

    }

    removeItem() {

        const _this = this;

        $(document).on('click', '.app-list__remove', function (e) {

            e.preventDefault();

            const ths = $(this);

            const item = ths.closest('.app-list__item');

            item.remove();

            _this.saveInStorage();
        });

    }

    changeItemValue() {

        const _this = this;

        $(document).on('click', '.app-list__item span', function () {

            const ths = $(this);

            const val = ths.text();

            let test = ths.find('input').length == 0;

            if(test){
                ths.html(createInput(val));
                ths.find('input').focus().select();

                ths.find('input').focusout(function () {
                   let _ths = $(this), val = _ths.val();
                    _this.saveInputValue(val, ths);
                });
            }
        });

    }

    saveInputValue(val, elem) {

        const _this = this;

        if(val && (val.trim().length>0)) {
            elem.html(val);
            _this.saveInStorage();
        }else {
            elem.find('input').addClass('error').focus();
        }
    }

    saveInStorage() {

        const items = $(document).find('.app-list__item');

        if(items.length > 0) {

            const arr = [];

            items.each(function () {

                const ths = $(this);

                const val = ths.find('span').text();

                arr.push(val);

            });

            localStorage.setItem('items', JSON.stringify(arr));

        }else {
            localStorage.setItem('items', '');
        }

    }

    checkStorage() {

        const stor = localStorage.getItem('items');

        const wrapper = $(document).find('.app-list');

        if(stor && (stor.length > 0)) {
            const arr = JSON.parse(stor);
            if(arr.length > 0) {
                arr.forEach(item => wrapper.append(listItem(item)));
            }
        }


    }

    init() {

        const _this = this;

        _this.createApp();

        $(document).on('submit', '.app-form', function (e) {
            e.preventDefault();
            const $input = $(this).find('.app-form__input');

            _this.changeInputVal($input);
        });

        _this.removeItem();

        _this.changeItemValue();
    }
}