// add option component
Vue.component('add-option', {
  props: {
    handleAddNewOption: {
      type: [Function],
      required: true
    }
  },
  template: `
    <div>
      <p>{{ error }}</p>
      <form class="add-form" v-on:submit.prevent="handleSubmitForm">
        <input 
          class="add-form__input"
          type="text"
          placeholder="Your Option..."
          :value="defaultOption"
          @input="handleOnChange($event.target.value)" 
        />
        <button class="button button--bg">Add Option</button>
      </form>
    </div>
  `,
  data: function () {
    return {
      option: '',
      error: undefined
    }
  },
  computed: {
    defaultOption: function () {
      return this.option ? this.option : ''
    },
  },
  methods: {
    handleOnChange: function (e) {
      const optionValue = e;
      this.option = optionValue;
    },
    handleSubmitForm: function (e) {
      e.preventDefault();
      const option = this.option;
      // check value error
      this.error = this.handleAddNewOption(option)
      return this.option = ''
    }
  }
});

// option list item component
Vue.component('option-list-item', {
  props: {
    id: {
      type: [String],
      required: true
    },
    text: {
      type: [String],
      required: true
    },
    removeItem: {
      type: [Function]
    }
  },
  template: `
    <li class="options-list__item">
      <transition name="slide-fade">
        <p class="options-list__item__text">{{ text }}</p>
      </transition>
      <button class="button" v-on:click="removeItem(id)">Remove</button>
    </li>
  `
});

// options list component
Vue.component('options-list', {
  props: {
    options: {
      type: [Array],
      required: true
    },
    removeAllOptions: {
      type: [Function],
      required: true
    },
    removeOptionItem: {
      type: [Function],
      required: true
    }
  },
  template: `
    <div class="options-list">
      <div class="options-list__header">
        <h3 class="options-list__header__title">Your Options</h3>
        <button class="button button--bg" v-on:click="removeAllOptions">Remove All</button>
      </div>
      <span v-if="options.length === 0">Please add an option to get started!</span>
      <ul class="option-list">
        <option-list-item
          v-for="(option, index) in options"
          v-bind:key="index"
          v-bind:id="option.id"
          v-bind:text="option.text"
          v-bind:removeItem="removeOptionItem"
        >
        </option-list-item>
      </ul>
    </div>
  `
});

// header component
Vue.component('header-view', {
  props: {
    title: {
      type: [String],
      default: 'Vue Demo App'
    },
    subTitle: {
      type: [String],
      required: false
    }
  },
  template: `
    <div class="header">
      <h1 class="header-title">{{ title }}</h1>
      <h4 class="header-sub-title">{{ subTitle }}</h4>
    </div>
  `
});

// app component
Vue.component('indecision-app', {
  template: `
    <div class="container">
      <header-view
        subTitle="This is a Demo Vue JS App"
      ></header-view>
      <div>
        <options-list 
          v-bind:options="options"
          v-bind:removeAllOptions="removeAllOptions"
          v-bind:removeOptionItem="removeOptionItem"
        >
        </options-list>
        <add-option
          v-bind:handleAddNewOption="handleAddNewOption"
        >
        </add-option>
      </div>
    </div>
  `,
  data: function () {
    return {
      options: [
        { id: uuidv4(), text: 'Option One' },
        { id: uuidv4(), text: 'Option Two' }
      ]
    }
  },
  methods: {
    removeAllOptions: function () {
      this.options = []
    },
    removeOptionItem: function (passId) {
      this.options = this.options.filter(({ id }) => id !== passId)
    },
    handleAddNewOption: function (option) {
      // validation
      if (!option) {
        return 'Enter valid value to add item.'
      } else if (this.options.includes(option)) {
        return 'The item already exists.'
      }

      this.options = this.options.concat({ id: uuidv4(), text: option })
    }
  }
});

// app root
new Vue({ el: '#root', template: `<indecision-app></indecision-app>` })