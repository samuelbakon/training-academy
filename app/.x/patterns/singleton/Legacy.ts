/**
 * --- LEGACY CODE ---
 */

/* ==================================================================== */
class PaymentConfig {
    public apiKey: string;
    public apiSecret: string;

    constructor() {
        this.apiKey = "pk_live_12345";
        this.apiSecret = "sk_live_67890";
        console.log("New Instance Created: Connecting to Payment Gateway...");
    }
}

/* ==================================================================== */
// Problem: Multiple instances lead to redundant connections and state inconsistency
const config1 = new PaymentConfig();
const config2 = new PaymentConfig();

console.log(config1 === config2); // false