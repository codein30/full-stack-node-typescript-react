import {Keyword, KeywordMethods} from "@tsed/ajv";
import {array, number, object} from "@tsed/schema";

@Keyword({
  keyword: "age",
  type: undefined,
  schemaType: "array",
  implements: ["exclusiveAge"],
  metaSchema: array().items([]).minItems(1).additionalItems(false)
})
class RangeKeyword implements KeywordMethods {
  compile([min]: any[], parentSchema: any) {
    const myAge = (data: any) => {
      const ageDifMs = Date.now() - new Date(data).getTime();
      const ageDate = new Date(ageDifMs);
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    return parentSchema.exclusiveRange === true ? (data: any) => {
      return  myAge(data) > Number(min);
    }: (data: any) => {
      return myAge(data) >= Number(min);
    };
  }
}
