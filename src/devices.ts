import { Device } from "./types";
import { apiEndpoint } from "./utils";

/**
 * Devices Handler
 * @param chainId 1 for mainnet, 11155111 for Sepolia testnet
 */
export const devices = (params?: { chainId: 1 | 11155111 }) => {
  const chainId = params?.chainId || 1;

  /**
   * Fetches a single device by id
   * @param id Device id
   */
  const fetchOne = async ({ id }: { id: string }) => {
    const res = await fetch(`${apiEndpoint(chainId)}/devices/${id}`);
    if (!res.ok) {
      throw new Error(`error fetching ${id}`);
    }
    const device = (await res.json()) as Device;
    return device;
  };

  /**
   * Fetches all devices
   */
  const fetchAll = async () => {
    const res = await fetch(`${apiEndpoint(chainId)}/devices`);
    if (!res.ok) {
      throw new Error(`error fetching devices`);
    }
    const devices = (await res.json()) as Device[];
    return devices;
  };

  return {
    fetchOne,
    fetchAll,
  };
};
