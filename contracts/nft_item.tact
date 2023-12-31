import "@stdlib/deploy";
import "@stdlib/ownable";
import "./imports/messages";


contract NftItem with Deployable, Ownable {
    owner: Address;
    collection_address: Address;
    item_index: Int as uint32;
    url: String;
    reward: Int as coins; // range 0 to 2^120 - 1 (takes 120 bit = 15 bytes)


    init(owner: Address, collection_address: Address, item_index: Int, url: String, reward: Int){
        self.owner = owner;
        self.item_index = item_index;
        self.collection_address = collection_address;
        self.url = url;
        self.reward = reward;
    }

    receive("Claim") {
        // SendPayGasSeparately: for excess
        let amount: Int = min(self.reward, myBalance() - context().value);

        send(SendParameters{
            to: sender(),
            bounce: true,
            value: amount,
            mode: SendPayGasSeparately 
        });
    }

    receive(msg: SetReward) {
        self.requireOwner();
        self.reward = msg.reward;
    }

    receive(msg: Transfer){
        self.requireOwner();
        self.owner = msg.new_owner;
        self.url = msg.url;
    }

    receive(msg: UpdateUrl){
        self.requireOwner();
        self.url = msg.url;
    }

    get fun getItemData(): ItemData {
        return
            ItemData{item_index: self.item_index,
                collection_address: self.collection_address,
                owner: self.owner,
                url: self.url,
                reward: self.reward
            };
    }

    get fun getUrl(): String {
        return self.url;
    }

    get fun getOwnerAddress(): Address {
        return self.owner;
    }
}