import { Subscription } from 'rxjs';

export class SubscriptionHandler {
  protected _subs: Subscription[] = [];

  constructor() {}
  set subList(subscription: Subscription) {
    this._subs.push(subscription);
  }

  unsubscribe() {
    this._subs.forEach((sub) => sub && typeof sub.unsubscribe === 'function' && sub.unsubscribe());
    this._subs = [];
  }
}
