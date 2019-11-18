import {
  GetIpAddressAsNumber,
  SortIpByNumberOfRequests
} from "./IPAddressUtilities";

describe("GetIpAddressAsNumber", () => {
  test("should return the number representation of an ip address", () => {
    const actual = GetIpAddressAsNumber("1.1.1.1");
    const expected =
      1 * Math.pow(256, 3) + 1 * Math.pow(256, 2) + 1 * Math.pow(256, 1) + 1;
    expect(actual).toEqual(expected);
  });

  test("should return the number representation of an ip address", () => {
    const actual = GetIpAddressAsNumber("45.1.27.1");
    const expected =
      45 * Math.pow(256, 3) + 1 * Math.pow(256, 2) + 27 * Math.pow(256, 1) + 1;
    expect(actual).toEqual(expected);
  });
});

describe("SortIpByNumberOfRequests", () => {
  test("", () => {
    const ips = {
      "169.123.16.9": 1,
      "169.123.6.89": 1,
      "169.123.16.100": 1,
      "169.123.16.12": 1
    };

    const actual = SortIpByNumberOfRequests(ips);

    expect(actual).toEqual([
      { ipAddress: "169.123.6.89", count: 1 },
      { ipAddress: "169.123.16.9", count: 1 },
      { ipAddress: "169.123.16.12", count: 1 },
      { ipAddress: "169.123.16.100", count: 1 }
    ]);
  });
});
