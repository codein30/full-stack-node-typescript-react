const Ajv = require("ajv");
// options can be passed, e.g. {allErrors: true}import {PlatformTest} from "@tsed/common";
import "../keywords/MinAgeKeyword";

describe("Product", () => {
  const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
  it("should call custom keyword validation (compile)", () => {
    const schema = {minAge: Object(16), exclusiveMinAge: true}
    const validate = ajv.compile(schema);
    console.log(validate(new Date("2018-6-20")))
  });
});