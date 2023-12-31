import { Address, toNano } from 'ton-core';
import { NftCollection } from '../wrappers/NftCollection';
import { NetworkProvider, sleep } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const nftCollection = provider.open(await NftCollection.fromInit());

    const address = provider.sender().address;
    if (!address) {
        return;
    }
    const nftAddressBefore = await nftCollection.getGetMyNftAddress(address);

    await nftCollection.send(
        provider.sender(),
        {
            value: toNano('1.05'), // 0.05 for gas, 1 for mint price
        },
        {
            $$type: 'Mint',
            url: 'Si-fcjJ1cO4',
        }
    );

    let nftAddressAfter = await nftCollection.getGetMyNftAddress(address);

    while (!nftAddressAfter || nftAddressBefore?.equals(nftAddressAfter)) {
        nftAddressAfter = await nftCollection.getGetMyNftAddress(address);
        await sleep(2000);
    }

    console.log('Mint Success');
    console.log('nftAddressBefore', nftAddressBefore);
    console.log('nftAddressAfter', nftAddressAfter);
}
