import "mocha";
import { assert } from "chai";
import { devices } from "../src/index";
import { describe, it, before, after } from "mocha";
import nock from "nock";

const mockDevice = {
  id: "abc",
  name: "Test Device",
  manufacturer: "Test Manufacturer",
};

describe("Devices", () => {
  before(() => {
    nock("https://marketplace-api-goerli.onrender.com")
      .get("/devices/abc")
      .reply(200, mockDevice);

    nock("https://marketplace-api-goerli.onrender.com")
      .get("/devices")
      .reply(200, [mockDevice]);
  });

  after(() => {
    nock.cleanAll();
  });

  /**
   * Tests midi.fetchOne
   * It should use Sinon to stub the fetch call
   */
  describe("fetchOne", () => {
    it("Should fetch a single Device", async () => {
      const _devices = devices({ chainId: 11155111 });
      const nft = await _devices.fetchOne({ id: "abc" });

      assert.equal(nft.id, "abc");
      assert.equal(nft.name, "Test Device");
      assert.equal(nft.manufacturer, "Test Manufacturer");
    });
  });

  describe("fetchAll", () => {
    it("Should fetch all Devices", async () => {
      const _devices = devices({ chainId: 11155111 });
      const nfts = await _devices.fetchAll();

      assert.equal(nfts.length, 1);
      assert.equal(nfts[0].id, "abc");
      assert.equal(nfts[0].name, "Test Device");
      assert.equal(nfts[0].manufacturer, "Test Manufacturer");
    });
  });
});
