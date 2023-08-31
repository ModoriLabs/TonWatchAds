import { Address, toNano } from 'ton-core';
import { NftItem } from '../wrappers/NftItem';
import { NetworkProvider } from '@ton-community/blueprint';
import { NftCollection } from '../wrappers/NftCollection';

export async function run(provider: NetworkProvider) {
    const nftCollection = provider.open(await NftCollection.fromInit());
    const url = 'https://www.google.com';
    const ownerAddress = provider.sender().address;
    if (!ownerAddress) {
        return;
    }
    const nftItemAddress = await nftCollection.getGetMyNftAddress(ownerAddress);
    if (!nftItemAddress) {
        return;
    }
    const nftItem = provider.open(await NftItem.fromAddress(nftItemAddress));

    await nftItem.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'UpdateUrl',
            url,
        }
    );
    console.log('!!!!!!!!!!!!!!!!updated!!!!!!!!!!!!!!!!!!');
}
