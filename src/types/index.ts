export type Patch = {
  name: string;
  midi: Uint8Array | undefined;
  tags: string[];
  image: string | undefined;
};

export type IPFSMetadata = {
  name: string;
  description: string;
  image: string;
  properties: {
    entries: Patch[];
  };
};

export type MIDI = {
  id: number;
  createdBy: string;
  metadata: IPFSMetadata;
  totalSupply: number;
};

export type Device = {
  created_at: string;
  name: string;
  manufacturer: string;
  id: string;
};
