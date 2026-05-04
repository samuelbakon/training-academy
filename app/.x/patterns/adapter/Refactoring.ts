// Refactoring: Implementation using the Adapter Design Pattern
// This allows the system to support multiple providers without changing the business logic

interface PaymentProcessor {
    process(amount: number): void;
}

// Existing Legacy Service (The Adaptee)
class PayPalService {
    public sendPayment(amount: number): void {
        console.log(`Processing $${amount} via PayPal internal API.`);
    }
}

// New Service with a different interface (The Adaptee)
class StripeService {
    public makeTransaction(total: number): void {
        console.log(`Processing $${total} via Stripe SDK.`);
    }
}

// Adapters bridge the gap between the interface and the specific services
class PayPalAdapter implements PaymentProcessor {
    constructor(private paypal: PayPalService) {}

    public process(amount: number): void {
        this.paypal.sendPayment(amount);
    }
}

class StripeAdapter implements PaymentProcessor {
    constructor(private stripe: StripeService) {}

    public process(amount: number): void {
        this.stripe.makeTransaction(amount);
    }
}

// The Client now depends on the interface, not concrete classes
class CheckoutProcess {
    constructor(private processor: PaymentProcessor) {}

    public run(amount: number): void {
        this.processor.process(amount);
    }
}

const amount = 250;

// Switching providers is now seamless
const paypalAdapter = new PayPalAdapter(new PayPalService());
const stripeAdapter = new StripeAdapter(new StripeService());

const checkoutA = new CheckoutProcess(paypalAdapter);
checkoutA.run(amount);

const checkoutB = new CheckoutProcess(stripeAdapter);
checkoutB.run(amount);