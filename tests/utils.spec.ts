import "mocha";
import { assert } from "chai";
import { describe, it } from "mocha";
import { apiEndpoint, useNftStorageUrl } from "../src/utils";

describe("utils/index.ts", () => {
  it("Should return the correct api endpoint", () => {
    assert.equal(
      apiEndpoint(11155111),
      "https://marketplace-api-goerli.onrender.com"
    );
    assert.equal(apiEndpoint(1), "");
  });

  it("Should switch ipfs url to nftstorage url in MIDI", () => {
    const midi = {
      id: 1,
      createdBy: "0x123",
      totalSupply: 1,
      metadata: {
        name: "test",
        description: "",
        image: "ipfs://abc.jpg",
        properties: {
          entries: [
            {
              name: "",
              midi: new Uint8Array(),
              tags: [],
              image: "ipfs://def.jpg",
            },
          ],
        },
      },
    };

    const updatedPaths = useNftStorageUrl(midi);

    assert.equal(
      updatedPaths.metadata.image,
      "https://nftstorage.link/ipfs/abc.jpg"
    );
    assert.equal(
      updatedPaths.metadata.properties.entries[0].image,
      "https://nftstorage.link/ipfs/def.jpg"
    );
  });
});
