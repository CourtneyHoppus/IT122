'use strict'
import { expect } from 'chai';
import { describe, it } from 'mocha';
import * as cat from '../data.js';

describe("Cat", () => {
  it("returns requested cat", () => {
      let result = cat.getItem("marley");
      expect(result).to.deep.equal(
        { number: "1", name: "Marley", colors: ["calico"], fat: false}
        );
  });
  it("fails to return w/ an invalid cat", () => {
      let result = cat.getItem("fake");
      expect(result).to.be.undefined;
  });
});
