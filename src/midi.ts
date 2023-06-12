import { MIDI } from "./types/index.js";
import { apiEndpoint, useNftStorageUrl } from "./utils/index.js";
import { ChainOptions } from "./utils/index.js";

export const midi = (params?: { chainId: ChainOptions }) => {
  const chainId = params?.chainId || 1;

  const fetchOne = async ({ id }: { id: number }) => {
    const res = await fetch(`${apiEndpoint(chainId)}/midi/${id}`);
    if (!res.ok) {
      throw new Error(`error fetching ${id}`);
    }
    let midi = (await res.json()) as MIDI;

    midi = useNftStorageUrl(midi);

    return midi;
  };

  /**
   * Fetches all MIDI
   * @param deviceId Device id
   * @param search Search query string
   * @returns MIDI[]
   */
  const fetchAll = async ({
    deviceId,
    search,
  }: {
    deviceId?: string;
    search?: string;
  }) => {
    const url = new URL(`${apiEndpoint(chainId)}/midi`);
    const queryParams = new URLSearchParams();

    /**
     * search by device id
     */
    if (deviceId) {
      queryParams.append("deviceId", deviceId);
    }

    /**
     * Search by query string for tags or pack name
     */
    if (search) {
      queryParams.append("search", search);
    }

    url.search = queryParams.toString();

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`error fetching midi`);
    }

    let midi = (await res.json()) as MIDI[];

    midi = midi.map((_midi) => useNftStorageUrl(_midi));
    return midi;
  };

  return { fetchOne, fetchAll };
};
