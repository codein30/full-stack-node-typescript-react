import {CustomKey} from "@tsed/schema";

export function MinAge(minAge: number) {
  return CustomKey("minAge", minAge);
}

export function ExclusiveMinAge(bool: boolean) {
  return CustomKey("exclusiveMinAge", bool);
}
