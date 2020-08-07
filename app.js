// Add option component
Vue.component('add-option', {
    props: {
        addNewOption: {
            type: [Function],
            required: true
        }
    },
    template: `
        <form v-on:submit.prevent="handleSubmitForm">
            <input type="text" :value="defaultOption" @input="handleOnChange($event.target.value)"/>
            <button>Add Option</button>
        </form>
    `,
    data: function () {
        return {
            option: '',
            error: undefined
        }
    },
    computed: {
        defaultOption: function () {
            return this.option = ''
        }
    },
    methods: {
        handleOnChange: function (e) {
            const optionValue = e;
            this.option = optionValue;
        },
        handleSubmitForm: function (e) {
            e.preventDefault();
            this.error = this.addNewOption(this.option)
            return this.option = ''
        }
    }
});

// Option item component
Vue.component('option-item', {
    props: {
        item: {
            type: [Object],
            required: true
        }
    },
    template: `
        <li>
            <p>{{ item.text }}</p>
            <button>Remove</button>
        </li>
    `
});

// Options component
Vue.component('options-view', {
    props: {
        options: {
            type: [Array],
            required: true,
        }
    },
    template: `
        <div>
            <ul>
                <option-item 
                    v-for="option in options"
                    v-bind:key="option.id"
                    v-bind:item="option"
                >
                </option-item>
            </ul>
        </div>
    `
});

// Header component
Vue.component('header-view', {
    props: {
        title: {
            type: [String],
            required: true
        },
        subTitle: {
            type: [String],
            required: false
        }
    },
    template: `
        <div>
            <h1>{{ title }}</h1>
            <h4>{{ subTitle }}</h4>
        </div>
    `
});

// App root component
Vue.component('app-root', {
    template: `
        <div>
            <header-view
                title="Indecision App"
                subTitle="Put your life in the hands of a computer."
            ></header-view>
            <div>
                <options-view 
                    v-bind:options="options"
                    >
                </options-view>
            </div>
            <div>
                <add-option
                    v-bind:addNewOption="addNewOption"
                ></add-option>
            </div>
        </div>
    `,
    data: function () {
        return {
            options: [
                { id: uuidv4(), text: 'Option One' },
                { id: uuidv4(), text: 'Option Two' },
            ]
        }
    },
    methods: {
        addNewOption: function (option) {
            // validation
            if (!option) {
                return 'Enter valid value to add item.'
            } else if (this.options.indexOf(option) > -1) {
                return 'The item already exists.'
            }

            this.options = this.options.concat({ id: uuidv4(), text: option })
        }
    }
});

new Vue({
    el: '#root',
    template: `<app-root></app-root>`
});
