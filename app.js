// error message component
Vue.component('error-message', {
    props: [],
    template: `<span></span>`
});

// add option form component
Vue.component('add-option', {
    props: {
        text: {
            type: [String]
        },
        addNewOption: {
            type: [Function]
        }
    },
    computed: {

    },
    template: `
        <form v-on:submit.prevent="addNewOption">
            <input type="text" v-model="text" />
            <button>Add Option</button>
        </form>
    `
});

// option item component
Vue.component('option-item', {
    props: {
        text: {
            type: [String]
        },
        deleteOption: {
            type: [Function]
        }
    },
    template: `
        <li>
            <p>{{ text }}</p>
            <button v-on:click="deleteOption(text)">Remove</button>
        </li>
    `
});

// options component
Vue.component('options', {
    props: {
        list: {
            type: [Array]
        },
        removeAllOptions: {
            type: [Function]
        },
        removeOptionItem: {
            type: [Function]
        }
    },
    template: `
        <div>
            <div>
                <h3></h3>
                <button v-on:click="removeAllOptions">Remove All</button>
            </div>
            <ul>
                <option-item 
                    v-for="item in list" 
                    v-bind:key="item.id"
                    v-bind:text="item.text"
                    v-bind:deleteOption="removeOptionItem"
                >
                </option-item>
            </ul>
        </div>
    `
})

// header component
Vue.component('header-view', {
    template: `
        <div>
            <h1>Indecision App</h1>
            <h5>Put your life in the hands of a computer.</h5>
        </div>
    `
})

// app root component
Vue.component('app-root', {
    props: {
        options: {
            type: [Array]
        },
        removeAllOptions: {
            type: [Function]
        },
        removeOptionItem: {
            type: [Function]
        },
        optionText: {
            type: [String]
        },
        addNewOption: {
            type: [Function]
        }
    },
    template: `
        <div>
            <header-view></header-view>
            <div>
                <options 
                    v-bind:list="options"
                    v-bind:removeAllOptions="removeAllOptions"
                    v-bind:removeOptionItem="removeOptionItem"
                >
                </options>
            </div>
            <div>
                <error-message></error-message>
                <add-option
                    v-bind:text="optionText"
                    v-bind:addNewOption="addNewOption"
                ></add-option>
            </div>
        </div>
    `
});

// app root provider
const root = new Vue({
    el: '#root',
    template: `
        <app-root 
            v-bind:options="options"
            v-bind:removeAllOptions="removeAllOptions"
            v-bind:removeOptionItem="removeOptionItem"
            v-bind:optionText="optionText"
            v-bind:addNewOption="addNewOption"
        >
        </app-root>
    `,
    data: {
        options: [
            { id: uuidv4(), text: 'Option One' }, // default values
            { id: uuidv4(), text: 'Option Two' },
        ],
        optionText: '',
        error: undefined
    },
    methods: {
        // remove option array
        removeAllOptions: function () {
            this.options = []
        },
        // remove single option item
        removeOptionItem: function (removeText) {
            this.options = this.options.filter(({ text }) => text !== removeText)
        },
        // add new item to options
        addNewOption: function (e) {
            e.preventDefault();

            // set option - text value
            const option = this.optionText;
            // check has option empty
            if (!option) {
                // set error -msg
                this.error = 'Enter valid value to add item.'
            } else {
                // add new option - (reset error default)
                this.error = undefined
                this.options = this.options.concat({ id: uuidv4(), text: this.optionText })
            }

        }
    }
});