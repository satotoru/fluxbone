import * as Backbone from "backbone";
import FluxModel from "./Model";

abstract class FluxCollection<TModel extends FluxModel> extends Backbone.Collection<TModel> {
  public handleDispatch(action): void {
    for (const model of this.models) {
      model.handleDispatch(action);
    }
  }
}

export default FluxModel;
