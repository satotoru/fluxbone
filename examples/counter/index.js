const Fluxbone = require("fluxbone");
const Backbone = require("backbone");

class CounterModel extends Fluxbone.Model {
  get defaults() { return { number: 0 }; }

  validate(attrs, options) {
    if (attrs.number < 0) {
      return 'Count cannot be less than 0.'
    }
  }

  handleDispatch(action) {
    switch(action.type) {
    case "INCREMENT":
      this.set('number', this.get('number') + 1, { validate: true })
      break;
    case "DECREMENT":
      this.set('number', this.get('number') - 1, { validate: true })
      break;
    case "RESET":
      this.set(this.defaults)
      this.trigger('reset')
      break;
    default:
      break;
    }
  }
}

const store = Fluxbone.createStore({
  counter: new CounterModel()
})

class CounterView extends Backbone.View {
  initialize() {
    this.listenTo(this.model, "change", this.renderResult.bind(this));
    this.listenTo(this.model, "invalid", this.showError.bind(this));
    this.listenTo(this.model, "reset", this.hideError.bind(this));
  }

  get events() {
    return {
      "click #inc": "inc",
      "click #dec": "dec",
      "click #reset": "reset"
    };
  }

  inc(e) {
    e.preventDefault();
    store.dispatch({
      type: "INCREMENT"
    });
  }

  dec(e) {
    e.preventDefault();
    store.dispatch({
      type: "DECREMENT"
    });
  }

  reset(e) {
    e.preventDefault();
    store.dispatch({
      type: "RESET"
    });
  }

  renderResult(model) {
    this.$("#result").text(model.get("number"));
  }

  showError(model, error) {
    this.$("#error").text(error);
    this.$("#error").show();
  }

  hideError(model) {
    this.$("#error").hide();
    this.$("#error").text('');
  }

  render() {
    this.$el.html(`
      <div id="error" style="color: red; display: none"></div>
      <button id="inc">+</button>
      <button id="dec">-</button>
      <button id="reset">reset</button>
      <span id=result>0</span>
    `);
    return this;
  }
}

const view = new CounterView({ model: store.resources.counter});
Backbone.$("#main").append(view.render().el);
