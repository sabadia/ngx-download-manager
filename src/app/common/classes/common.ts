import * as lodash from 'lodash';
import {Subscription} from "rxjs";

class SubscriptionHandler {
  constructor(private _subs: Subscription[] = []) {}

  set subList(subscription: Subscription) {
    this._subs.push(subscription);
  }

  unsubscribe() {
    this._subs.forEach(sub => sub && typeof sub.unsubscribe === 'function' && sub.unsubscribe());
    this._subs = [];
  }
}


export class Common{
  public static get NewRandomGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,  (c) => {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  public static lodash = lodash;

  public static get NewSubs(): SubscriptionHandler {
    return new SubscriptionHandler();
  }


  public static getValueOrDefault(valueFn: () => any, defaultValue: any = null): any {
    try {
      return valueFn() || defaultValue;
    } catch (error) {
      return defaultValue;
    }
  }
}
