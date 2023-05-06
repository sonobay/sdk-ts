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
  return chainId === 11155111
    ? "https://marketplace-api-goerli.onrender.com"
    : "";
};
