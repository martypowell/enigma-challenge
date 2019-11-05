import { GetIpAddressAsNumber } from "./utilities";

test("should return the number representation of an ip address", () => {
  const actual = GetIpAddressAsNumber("1.1.1.1");
  const expected = 1 * 256 * 4 + 1 * 256 * 3 + 1 * 256 * 2 + 1 * 256 * 1;
  expect(actual).toEqual(expected);
});

test("should return the number representation of an ip address", () => {
  const actual = GetIpAddressAsNumber("45.1.27.1");
  const expected = 45 * 256 * 4 + 1 * 256 * 3 + 27 * 256 * 2 + 1 * 256 * 1;
  expect(actual).toEqual(expected);
});
