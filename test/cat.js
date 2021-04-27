'use strict'
import { expect } from 'chai';
import Mocha from 'mocha';
import * as cat from '../data.js';

Mocha.describe("Cat", () => {
  // tests getItem with success & failure conditions
  // success
  Mocha.it("returns requested cat", () => {
      let result = cat.getItem("marley");
      expect(result).to.deep.equal(
        { number: "1", name: "Marley", colors: ["calico"], fat: false }
      );
  });
  //failure
  Mocha.it("fails to return an invalid cat", () => {
      let result = cat.getItem("fake");
      expect(result).to.be.undefined;
  });
  // tests addItem with success & failure conditions
  // success
  Mocha.it("adds a new cat", () => {
      let result = cat.addItem(
        { number: "6", name: "undetermined", colors: ["surprise"], fat: null }
        );
      expect(result.added).to.be.true;
  });
  //failure
  Mocha.it("fails to add an existing cat", () => {
    let result = cat.addItem(
      { number: "1", name: "Marley", colors: ["calico"], fat: false }
    );
      expect(result.added).to.be.false;
  });
  // tests deleteItem with success & failure conditions
  // success
  Mocha.it("deletes requested cat", () => {
      let result = cat.deleteItem("marley");
      expect(result.deleted).to.be.true;
  });
  //failure
  Mocha.it("fails to delete an invalid cat", () => {
      let result = cat.deleteItem("fake");
      expect(result.deleted).to.be.false;
  });
});
