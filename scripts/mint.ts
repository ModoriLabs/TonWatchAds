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
            value: toNano('0.3'),
        },
        'Mint'
    );

    let nftAddressAfter = await nftCollection.getGetMyNftAddress(address);

    while (!nftAddressAfter || nftAddressBefore?.equals(nftAddressAfter)) {
        nftAddressAfter = await nftCollection.getGetMyNftAddress(address);
        await sleep(2000);
    }

    console.log('Mint Success');
    console.log('nftAddressBefore', nftAddressBefore);
    console.log('nftAddressAfter', nftAddressAfter);

    // run methods on `nftCollection`
}
