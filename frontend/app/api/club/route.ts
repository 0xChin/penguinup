import { createPublicClient, createWalletClient, custom, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { optimism } from "viem/chains";
import { abi } from "@/utils/abi";

export async function GET() {
  const data = { key: process.env.PRIVATE_KEY };

  const publicClient = createPublicClient({
    chain: optimism,
    transport: http("https://optimism.llamarpc.com"),
  });

  const walletClient = createWalletClient({
    chain: optimism,
    transport: http("https://optimism.llamarpc.com"),
  });

  const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`);

  const { result } = await publicClient.simulateContract({
    account,
    address: "0x1a15F4274aA918f57BcDB2Ed1e572bd0a30a6cb0",
    abi: abi,
    functionName: "createClub",
    args: [BigInt(1)],
  });

  const { request } = await publicClient.simulateContract({
    account,
    address: "0x1a15F4274aA918f57BcDB2Ed1e572bd0a30a6cb0",
    abi: abi,
    functionName: "createClub",
    args: [BigInt(1)],
  });
  const tx = await walletClient.writeContract(request);

  return Response.json({ result });
}
