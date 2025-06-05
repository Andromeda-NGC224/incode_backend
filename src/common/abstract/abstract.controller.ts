import { autobind } from 'common/utils';

export abstract class AbstractController {
  protected constructor() {
    autobind(this);
  }
}
