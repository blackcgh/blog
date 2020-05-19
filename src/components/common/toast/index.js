import Load from './Load'
import Tip from './Tip'
import Notice from './Notice'

export default {
  install(Vue) {
    const loadConstructor = Vue.extend(Load);
    const tipConstructor = Vue.extend(Tip);
    const NoticeConstructor = Vue.extend(Notice);

    const load = new loadConstructor();
    const tip = new tipConstructor();
    const notice = new NoticeConstructor();

    load.$mount(document.createElement('div'));
    tip.$mount(document.createElement('div'));
    notice.$mount(document.createElement('div'));

    document.body.appendChild(load.$el);
    document.body.appendChild(tip.$el);
    document.body.appendChild(notice.$el);

    Vue.prototype.$load = load;
    Vue.prototype.$tip = tip;
    Vue.prototype.$notice = notice;
  }
}
