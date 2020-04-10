export const search = Vue.component('search', {
    props: {
      searchLine: {
        type: String,
        required: false,
        default: '',
      }
    },
    template: `
        <form class="search-form" @submit.prevent>
          <input type="text" class="search-input" :value="searchLine"
            @input="updateSearchLine"/>
        </form>
    `,
    methods: {
      updateSearchLine(val) {
        const value = val.target.value;
        this.$emit('update:searchLine', value);
      }
    }
  });