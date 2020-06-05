
import Vue from "vue";

export const store = Vue.observable({
  device: {}
});

export const mutations = {
  setDevice(obj) {
    store.device = obj;
  }
};