import { MIDI } from "../types/index.js";

export const useNftStorageUrl = (midi: MIDI) => {
  midi.metadata.image = midi.metadata.image.replace(
    "ipfs://",
    "https://nftstorage.link/ipfs/"
  );
  midi.metadata.properties.entries = midi.metadata.properties.entries.map(
    (entry) => {
      if (entry.image) {
        entry.image = entry.image.replace(
          "ipfs://",
          "https://nftstorage.link/ipfs/"
        );
      }
      return entry;
    }
  );

  return midi;
};

export const apiEndpoint = (chainId: number) => {
  switch (chainId) {
    // Sepolia
    case 11155111:
      return "https://marketplace-api-goerli.onrender.com";

    // Polygon Mumbai
    case 80001:
      return "https://marketplace-api-mumbai.onrender.com";

    // Polygon Mainnet
    case 137:
      return "https://marketplace-api-polygon.onrender.com";

    default:
      return "";
  }
};

export type ChainOptions = 1 | 11155111 | 80001 | 137;
