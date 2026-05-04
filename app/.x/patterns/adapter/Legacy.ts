// Legacy: Direct integration with a specific payment provider (e.g., PayPal)
// This code is tightly coupled to a single vendor's implementation

class PayPalService {
    public sendPayment(amount: number): void {
        console.log(`Processing $${amount} via PayPal internal API.`);
    }
}

class CheckoutProcess {
    private paypalService: PayPalService;

    constructor() {
        this.paypalService = new PayPalService();
    }

    public run(amount: number): void {
        // Problem: If we want to add Stripe or MonCash, we must modify this class
        this.paypalService.sendPayment(amount);
    }
}

const checkout = new CheckoutProcess();
checkout.run(100);