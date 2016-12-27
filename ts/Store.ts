import FluxCollection from "./Collection";
import FluxModel from "./Model";

interface IResources {
  [key: string]: FluxModel | FluxCollection;
}

interface IAction {
  [key: string]: any;
}

export function createStore(resources: IResources): Store {
  return new Store(resources);
}

function isPromise(obj: any) {
  return typeof obj.then === "function";
}

class Store {
  private resources: IResources;

  constructor(resources: IResources) {
    this.resources = resources;
  }

  public dispatch(action: IAction): void {
    for (const key of Object.keys(this.resources)) {
      this.resources[key].handleDispatch(action);
    }
  }
}
