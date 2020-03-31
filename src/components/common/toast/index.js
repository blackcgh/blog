import Load from './Load'
import Tip from './Tip'

export default {
  install(Vue) {
    const loadConstructor = Vue.extend(Load);
    const tipConstructor = Vue.extend(Tip);

    const load = new loadConstructor();
    const tip = new tipConstructor();

    load.$mount(document.createElement('div'));
    tip.$mount(document.createElement('div'));

    document.body.appendChild(load.$el);
    document.body.appendChild(tip.$el);

    Vue.prototype.$load = load;
    Vue.prototype.$tip = tip;
  }
}
