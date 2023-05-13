import "mocha";
import { assert } from "chai";
import { midi } from "../src/index";
import { describe, it, before, after } from "mocha";
import nock from "nock";

const mockMidi = {
  id: 1,
  totalSupply: 99,
  metadata: {
    image: "",
    properties: {
      entries: [],
    },
  },
};

describe("MIDI", () => {
  before(() => {
    nock("https://marketplace-api-goerli.onrender.com")
      .get("/midi/1")
      .reply(200, mockMidi);

    nock("https://marketplace-api-goerli.onrender.com")
      .get("/midi")
      .reply(200, [mockMidi]);
  });

  after(() => {
    nock.cleanAll();
  });

  /**
   * Tests midi.fetchOne
   * It should use Sinon to stub the fetch call
   */
  describe("fetchOne", () => {
    it("Should fetch a single MIDI", async () => {
      const _midi = midi({ chainId: 11155111 });
      const nft = await _midi.fetchOne({ id: 1 });

      assert.equal(nft.id, 1);
      assert.equal(nft.totalSupply, 99);
    });
  });

  describe("fetchAll", () => {
    it("Should fetch all MIDI", async () => {
      const _midi = midi({ chainId: 11155111 });
      const nfts = await _midi.fetchAll({});

      assert.equal(nfts.length, 1);
      assert.equal(nfts[0].id, 1);
      assert.equal(nfts[0].totalSupply, 99);
    });
  });
});
