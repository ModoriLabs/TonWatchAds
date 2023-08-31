import { toNano } from 'ton-core';
import { TonWatchAds } from '../wrappers/TonWatchAds';
import { NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const tonWatchAds = provider.open(await TonWatchAds.fromInit());

    await tonWatchAds.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(tonWatchAds.address);

    // run methods on `tonWatchAds`
}
