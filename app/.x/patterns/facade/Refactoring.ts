/**
 * --- REFACTORED CODE (Facade Pattern) ---
 */

import { InventorySystem } from "./Legacy";
import { PaymentGateway } from "./Legacy";
import { ShippingService } from "./Legacy";

/* ==================================================================== */
class CheckoutFacade {
    private inventory = new InventorySystem();
    private payment = new PaymentGateway();
    private shipping = new ShippingService();

    public processOrder(itemId: string, price: number): void {
        console.log("Facade: Coordinating subsystems...");
        
        if (!this.inventory.checkStock(itemId)) {
            throw new Error("Out of stock");
        }

        const total = price + this.shipping.calculateRates();
        
        if (this.payment.charge(total)) {
            this.shipping.scheduleShipment();
            console.log("Order completed successfully!");
        }
    }
}

/* ==================================================================== */
// Usage: Client interacts with a single entry point
const store = new CheckoutFacade();
store.processOrder("PROD-101", 100);

/* ==================================================================== */
// Advantages: Simple API, Loose Coupling, Improved Readability