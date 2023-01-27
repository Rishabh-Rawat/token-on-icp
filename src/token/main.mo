import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import HashMap "mo:base/HashMap";
import Hash "mo:base/Hash";
import Debug "mo:base/Debug";
import Text "mo:base/Text";
import Iter "mo:base/Iter";

actor Token {
    let owner : Principal = Principal.fromText("fcvir-jo7ew-lctke-7hkcv-xfv5b-xneks-ih35k-surfz-jxf6t-gzvzq-gqe");
    let totalSupply : Nat = 1000000000;
    let symbol : Text = "CHAD";

    private stable var balanceEntries : [(Principal, Nat)] = [];

    private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);

    if (balances.size() < 1) {
        balances.put(owner, totalSupply);
    };

    public query func balanceOf(who : Principal) : async (Nat) {

        let balance : Nat = switch (balances.get(who)) {
            case (?value) { value };
            case (null) { 0 };
        };
        return balance;
    };

    public query func getSymbol() : async (Text) {
        return symbol;
    };

    public shared (msg) func payOut() : async (Text) {
        let user = msg.caller;
        let amount = 10000;

        if (balances.get(user) == null) {
            return await transfer(msg.caller, amount);
        } else {
            return "Already Claimed! Fuck off!";
        };

    };

    public shared (msg) func transfer(to : Principal, amt : Nat) : async (Text) {
        let from = msg.caller;
        let fromBalance = await balanceOf(from);

        // Debug.print(debug_show (from));
        // Debug.print(debug_show (to));

        if (fromBalance >= amt) {

            balances.put(from, fromBalance - amt);
            let toBalance = await balanceOf(to);
            balances.put(to, toBalance + amt);

            return "Transfer Successful!";
        } else {
            return "Insufficient funds!";
        };

    };

    system func preupgrade() {
        balanceEntries := Iter.toArray(balances.entries());
    };

    system func postupgrade() {
        balances := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);
        // if (balances.size() < 1) {
        //     balances.put(owner, totalSupply);
        // };
    };

};
