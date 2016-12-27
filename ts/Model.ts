import * as Backbone from "backbone";

abstract class FluxModel extends Backbone.Model {
  public abstract handleDispatch(action): void;
}

export default FluxModel;
