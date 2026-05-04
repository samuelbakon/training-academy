/**
 * --- REFACTORED CODE (Singleton Pattern) ---
 */

/* ==================================================================== */
class PaymentGatewayManager {
    private static instance: PaymentGatewayManager | null = null;
    private readonly connectionId: number;

    // Private constructor prevents direct instantiation
    private constructor() {
        this.connectionId = Math.random();
        console.log(`Payment Gateway Initialized. ID: ${this.connectionId}`);
    }

    /* ==================================================================== */
    public static getInstance(): PaymentGatewayManager {
        if (!PaymentGatewayManager.instance) {
            PaymentGatewayManager.instance = new PaymentGatewayManager();
        }
        return PaymentGatewayManager.instance;
    }

    public process(amount: number): void {
        console.log(`Processing $${amount} via Connection ${this.connectionId}`);
    }
}

/* ==================================================================== */
// Usage: Accessing the same instance across the entire application
const managerA = PaymentGatewayManager.getInstance();
const managerB = PaymentGatewayManager.getInstance();

managerA.process(100);
managerB.process(200);
console.log(managerA === managerB); // true