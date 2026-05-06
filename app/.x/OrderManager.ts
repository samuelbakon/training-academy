// Strategy interfaces
interface PaymentStrategy {
    processPayment(amount: number): void;
}

interface NotificationStrategy {
    send(message: string): void;
}

// Concrete payment strategies
class StripePaymentStrategy implements PaymentStrategy {
    processPayment(amount: number): void {
        console.log(`Calling Stripe SDK... Processing payment of $${amount}`); // Stripe API integration
    }
}

class MobileMoneyPaymentStrategy implements PaymentStrategy {
    processPayment(amount: number): void {
        console.log(`Calling MTN/Orange API... Processing payment of $${amount}`); // Mobile Money API integration
    }
}

class PaypalPaymentStrategy implements PaymentStrategy {
    processPayment(amount: number): void {
        console.log(`Calling PayPal API... Processing payment of $${amount}`); // PayPal API integration
    }
}

// Concrete notification strategies
class EmailNotificationStrategy implements NotificationStrategy {
    send(message: string): void {
        console.log(`Sending Email... ${message}`); // SMTP service integration
    }
}

class SMSNotificationStrategy implements NotificationStrategy {
    send(message: string): void {
        console.log(`Sending SMS... ${message}`); // SMS gateway integration
    }
}

// Facade
class OrderProcessingFacade {
    private paymentStrategy: PaymentStrategy;
    private notificationStrategies: NotificationStrategy[] = [];

    constructor(paymentStrategy: PaymentStrategy, notificationStrategies: NotificationStrategy[]) {
        this.paymentStrategy = paymentStrategy; // Dependency injection for payment strategy
        this.notificationStrategies = notificationStrategies; // Dependency injection for notification strategies
    }

    public processOrder(orderId: string, user: any, paymentType: string) {
        // 1. Business Logic: Check stock in database
        console.log("Connecting to MySQL... Checking catches inventory."); // Database connection for inventory check

        // 2. Pricing: Fixed logic for commissions
        let price = 100;
        if (user.isVIP) price = price * 0.9; // VIP discount logic

        // 3. Payment: Using selected strategy
        this.paymentStrategy.processPayment(price); // Strategy pattern for payment processing

        // 4. Notifications: Using configured strategies
        this.notificationStrategies.forEach(strategy => {
            strategy.send(`Order ${orderId} processed successfully.`); // Strategy pattern for notifications
        });

        // 5. Logging
        console.log("Writing logs to file: order_log.txt"); // File logging for audit trail
    }
}

// Service providers
class PaymentServiceProvider {
    static create(paymentType: string): PaymentStrategy {
        switch (paymentType) {
            case "STRIPE":
                return new StripePaymentStrategy(); // Factory method for Stripe
            case "MOBILE_MONEY":
                return new MobileMoneyPaymentStrategy(); // Factory method for Mobile Money
            case "PAYPAL":
                return new PaypalPaymentStrategy(); // Factory method for PayPal
            default:
                throw new Error("Unsupported payment type"); // Error handling for invalid payment type
        }
    }
}

class NotificationServiceProvider {
    static createAll(): NotificationStrategy[] {
        return [
            new EmailNotificationStrategy(), // Email notification
            new SMSNotificationStrategy() // SMS notification
        ];
    }
}

// Main entry point (OrderManager)
class OrderManager {
    private orderFacade: OrderProcessingFacade;

    constructor(paymentType: string) {
        const paymentStrategy = PaymentServiceProvider.create(paymentType); // Service provider pattern for payment
        const notificationStrategies = NotificationServiceProvider.createAll(); // Service provider pattern for notifications
        this.orderFacade = new OrderProcessingFacade(paymentStrategy, notificationStrategies); // Facade pattern initialization
    }

    public processOrder(orderId: string, user: any) {
        this.orderFacade.processOrder(orderId, user, ""); // Delegation to facade
    }
}

// Example usage
const orderManager1 = new OrderManager("STRIPE"); // Using Stripe payment strategy
orderManager1.processOrder("ORD123", { isVIP: true }); // VIP user order

const orderManager2 = new OrderManager("MOBILE_MONEY"); // Using Mobile Money payment strategy
orderManager2.processOrder("ORD456", { isVIP: false }); // Regular user order
