import {Keyword, KeywordMethods} from "@tsed/ajv";
import {array, number} from "@tsed/schema";

@Keyword({
  keyword: "age",
  type: "number",
  schemaType: "array",
  implements: ["exclusiveAgeRange"],
  metaSchema: array().items([number(), number()]).minItems(2).additionalItems(false)
})
class AgeKeyword implements KeywordMethods {
  compile([min, max]: number[], parentSchema: any) {
    const myAge = (data: any) => {
      const ageDifMs = Date.now() - new Date(data).getTime();
      const ageDate = new Date(ageDifMs);
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    return (data: any) => {
      return myAge(data) >= min && myAge(data) <= max
    }
  }
}
