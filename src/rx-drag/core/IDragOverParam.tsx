import { RxNode } from '../models/RxNode';
import { IMeta } from 'Base/RXNode/IMeta';


export type CursorPosition = "in-left" | "in-top" | "in-right" | "in-bottom" | "in-center" |
 "out-left" | "out-top" | "out-right" | "out-bottom" | undefined;

export interface IDragOverParam {
  position?: CursorPosition;
  targetNode?: RxNode<IMeta>;
}
