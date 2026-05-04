/**
 * --- REFACTORED CODE (Decorator Pattern) ---
 */

/* ==================================================================== */
interface Payment {
    getDescription(): string;
    getCost(): number;
}

/* ==================================================================== */
class BasePayment implements Payment {
    public getDescription(): string {
        return "Standard Payment";
    }
    public getCost(): number {
        return 10.0;
    }
}

/* ==================================================================== */
abstract class PaymentDecorator implements Payment {
    constructor(protected payment: Payment) {}
    public abstract getDescription(): string;
    public abstract getCost(): number;
}

/* ==================================================================== */
class InsuranceDecorator extends PaymentDecorator {
    public getDescription(): string {
        return this.payment.getDescription() + " + Insurance";
    }
    public getCost(): number {
        return this.payment.getCost() + 5.0;
    }
}

/* ==================================================================== */
class SmsDecorator extends PaymentDecorator {
    public getDescription(): string {
        return this.payment.getDescription() + " + SMS Notification";
    }
    public getCost(): number {
        return this.payment.getCost() + 2.0;
    }
}

/* ==================================================================== */
// Usage: Dynamic Composition
let myPayment: Payment = new BasePayment();
myPayment = new InsuranceDecorator(myPayment);
myPayment = new SmsDecorator(myPayment);

console.log(`${myPayment.getDescription()} | Total: $${myPayment.getCost()}`);



class OrderManager {
    public processOrder(orderId: string, user: any, paymentType: string) {
        // 1. Business Logic: Check stock in database
        console.log("Connecting to MySQL... Checking catches inventory.");

        // 2. Pricing: Fixed logic for commissions
        let price = 100;
        if (user.isVIP) price = price * 0.9; 

        // 3. Payment: Hardcoded providers
        if (paymentType === "STRIPE") {
            console.log("Calling Stripe SDK...");
        } else if (paymentType === "MOBILE_MONEY") {
            console.log("Calling MTN/Orange API...");
        }

        // 4. Notifications: Manual loop
        console.log("Sending Email to buyer...");
        console.log("Sending SMS to fisherman...");

        // 5. Logging
        console.log("Writing logs to file: order_log.txt");
    }
}
