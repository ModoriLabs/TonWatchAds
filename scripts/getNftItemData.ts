import { Address, toNano } from 'ton-core';
import { NftItem } from '../wrappers/NftItem';
import { NetworkProvider } from '@ton-community/blueprint';
import { NftCollection } from '../wrappers/NftCollection';

export async function run(provider: NetworkProvider) {
    const nftCollection = provider.open(await NftCollection.fromInit());
    // const nftCollectionAddress = 'EQCV5fY63gVo5W2krtNJfls7fpsahvxBIvqVk1-jpkGqecmg';
    // if (!nftCollectionAddress) {
    //     return;
    // }
    // const nftCollection = provider.open(await NftCollection.fromAddress(Address.parse(nftCollectionAddress)));
    const ownerAddress = provider.sender().address;
    console.log('ownerAddress', ownerAddress);
    if (!ownerAddress) {
        return;
    }
    const nftItemAddress = await nftCollection.getGetMyNftAddress(ownerAddress);
    console.log('nftItemAddress', nftItemAddress);
    if (!nftItemAddress) {
        return;
    }
    const nftItem = provider.open(await NftItem.fromAddress(nftItemAddress));
    const item = await nftItem.getGetItemData();
    console.log('item', item);
}
