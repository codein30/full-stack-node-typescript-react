import {Keyword, KeywordMethods} from "@tsed/ajv";
import {array, number} from "@tsed/schema";

@Keyword({
  keyword: "minAge",
  type: "object"
})
class MinAgeKeyword implements KeywordMethods {
  compile(minAge: any) {
    return (birthday: any) => {
      const ageDifMs = Date.now() - new Date(birthday).getTime();
      const ageDate = new Date(ageDifMs);
      const myAge = Math.abs(ageDate.getUTCFullYear() - 1970);
      console.log('ndate is ', myAge);
      console.log(myAge  >= minAge );
      return myAge >= minAge
    };
  }
}
