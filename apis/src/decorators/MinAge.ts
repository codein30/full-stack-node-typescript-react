import {CustomKey} from "@tsed/schema";

export function Age(min: any) {
  return CustomKey("age", [min]);
}

export function ExclusiveAge(bool: boolean) {
  return CustomKey("exclusiveAge", bool);
}
