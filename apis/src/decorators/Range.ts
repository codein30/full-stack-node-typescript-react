import {CustomKey} from "@tsed/schema";

export function Range(min: number, max: number) {
  return CustomKey("range", [min, max]);
}

export function ExclusiveRange(bool: boolean) {
  return CustomKey("exclusiveRange", bool);
}
