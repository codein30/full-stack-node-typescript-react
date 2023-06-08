import {CustomKey} from "@tsed/schema";

export function MinAge(minAge: number) {
  return CustomKey("minAge", minAge);
}
