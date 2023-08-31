message Transfer {
    queryId: Int;
    new_owner: Address;
}
message SetReward {
    reward: Int;
}

message UpdateUrl {
    url: String;
}

struct CollectionData {
    next_item_index: Int;
    owner_address: Address;
}
struct ItemData {
    owner: Address;
    collection_address: Address;
    item_index: Int;
    url: String;
    reward: Int;
}
struct CollectionMetadata {
    image: String;
    name: String;
    description: String;
}