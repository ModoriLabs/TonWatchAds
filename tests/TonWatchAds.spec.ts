import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { toNano } from 'ton-core';
import { TonWatchAds } from '../wrappers/TonWatchAds';
import '@ton-community/test-utils';

describe('TonWatchAds', () => {
    let blockchain: Blockchain;
    let tonWatchAds: SandboxContract<TonWatchAds>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        tonWatchAds = blockchain.openContract(await TonWatchAds.fromInit());

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await tonWatchAds.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: tonWatchAds.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and tonWatchAds are ready to use
    });
});
