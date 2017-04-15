import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    transparentBGNavBar: false
  },
  mutations: {
    changeTransparentBGNavbar(state, stateToChangeTo) {
      state.transparentBGNavBar = stateToChangeTo;
    }
  }
});
