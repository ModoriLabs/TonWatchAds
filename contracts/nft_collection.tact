import "@stdlib/deploy";
import "@stdlib/ownable";
import "./nft_item.tact";
import "./imports/messages";

contract NftCollection with Deployable, OwnableTransferable {
    const minTonForStorage: Int = ton("0.03");
    const gasConsumption: Int = ton("0.03");
    owner: Address;
    current_nft_address: Address;
    next_item_index: Int as uint32 = 0;
    // TODO:  set mint price
    mint_price: Int = ton("1");
    init(){
        self.owner = sender();
        self.current_nft_address = newAddress(0, 0);
    }

    // TODO: change to extendable data structure
    nft_address_map: map<Address, Address>;

    receive(msg: Mint){
        self.mint(sender(), msg.url);
    }

     fun mint(sender: Address, url: String) {
        require(self.next_item_index >= 0, "non-sequential NFTs");
        let nft_init: StateInit = self.getNftItemInit(self.next_item_index);
        let msgValue: Int = context().value;
        require(msgValue >= self.mint_price, "not enough value");

        let tonBalanceBeforeMsg: Int = myBalance() - msgValue;
        let storageFee: Int = self.minTonForStorage - min(tonBalanceBeforeMsg, self.minTonForStorage);
        msgValue = msgValue - storageFee + self.gasConsumption;

        let address: Address = contractAddress(nft_init);
        send(SendParameters{to: address,
                // value: context().value,
                // value: msgValue,
                value: self.mint_price,
                mode: SendPayGasSeparately,
                body: Transfer{queryId: 0, new_owner: sender, url: url}.toCell(),
                code: nft_init.code,
                data: nft_init.data
            }
        );
        self.next_item_index = self.next_item_index + 1;

        self.current_nft_address = address;
        self.nft_address_map.set(sender(), address);
    }

    fun getNftItemInit(item_index: Int): StateInit {
        // !FATAL: if url is "" then orbs rpc cannot parse data it returns 500 error
        let base_url: String = "https://ton.org/dev";
        return initOf NftItem(myAddress(), myAddress(), item_index, base_url, ton("0.1"));
    }

    get fun get_nft_address_by_index(item_index: Int): Address {
        let initCode: StateInit = self.getNftItemInit(item_index);
        return contractAddress(initCode);
    }

    get fun getCollectionData(): CollectionData {
        return CollectionData{next_item_index: self.next_item_index, owner_address: self.owner};
    }

    get fun get_current_nft_address(): Address {
        return self.current_nft_address;
    }

    get fun get_my_nft_address(owner: Address): Address? {
        if (self.nft_address_map.get(owner) != null) {
            return self.nft_address_map.get(owner)!!;
        } else {
            return null;
        }
    }
}