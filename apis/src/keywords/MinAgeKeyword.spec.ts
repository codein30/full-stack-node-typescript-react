// import "@tsed/ajv";
// import {PlatformTest} from "@tsed/common";
// import {getJsonSchema} from "@tsed/schema";
// import {Product} from "./Product";
// import "../keywords/RangeKeyword";

// describe("Product", () => {
//   beforeEach(PlatformTest.create);
//   afterEach(PlatformTest.reset);

//   it("should call custom keyword validation (compile)", () => {
//     const ajv = PlatformTest.get<any>(Ajv);
//     const schema = getJsonSchema(Product, {customKeys: true});
//     const validate = ajv.compile(schema);

//     expect(schema).to.deep.equal({
//       properties: {
//         price: {
//           exclusiveRange: true,
//           range: [10, 100],
//           type: "number"
//         }
//       },
//       type: "object"
//     });

//     expect(validate({price: 10.01})).toEqual(true);
//     expect(validate({price: 99.99})).toEqual(true);
//     expect(validate({price: 10})).toEqual(false);
//     expect(validate({price: 100})).toEqual(false);
//   });
// });