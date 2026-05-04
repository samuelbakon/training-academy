/**
 * --- LEGACY CODE ---
 */

/* ==================================================================== */
class InventorySystem {
    public checkStock(itemId: string): boolean {
        console.log(`Checking stock for ${itemId}...`);
        return true;
    }
}

/* ==================================================================== */
class PaymentGateway {
    public charge(amount: number): boolean {
        console.log(`Charging $${amount} to credit card...`);
        return true;
    }
}

/* ==================================================================== */
class ShippingService {
    public calculateRates(): number { return 5.0; }
    public scheduleShipment(): void {
        console.log("Scheduling delivery...");
    }
}

/* ==================================================================== */
// Problem: Client must manage all complex subsystems manually
const inventory = new InventorySystem();
const payment = new PaymentGateway();
const shipping = new ShippingService();

if (inventory.checkStock("PROD-101")) {
    if (payment.charge(100 + shipping.calculateRates())) {
        shipping.scheduleShipment();
    }
}

export {
    InventorySystem,
    PaymentGateway,
    ShippingService,
};