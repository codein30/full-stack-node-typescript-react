import {Keyword, KeywordMethods} from "@tsed/ajv";
import {array, number} from "@tsed/schema";

@Keyword({
  keyword: "minAge",
  type: "object",
  schemaType: "array",
  implements: ["exclusiveMinAge"],
  metaSchema: array().items([number()]).minItems(1).additionalItems(false)
})
class MinAgeKeyword implements KeywordMethods {
  compile([minAge]: any[], parentSchema: any) {
    const calculateAge = (birthday: any) => {
      const ageDifMs = Date.now() - new Date(birthday).getTime();
      const ageDate = new Date(ageDifMs);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
    return parentSchema.exclusiveMinAge === true ? (data: any) => calculateAge(data) > minAge : (data: any) => calculateAge(data) >= minAge;
  }
}
