/**
 * --- LEGACY CODE ---
 */

/* ==================================================================== */
class BasicPayment {
    public getDescription(): string {
        return "Standard Payment";
    }

    public getCost(): number {
        return 10.0;
    }
}

/* ==================================================================== */
// Problem: Class explosion when adding optional features 
// (Surcharges, Insurance, SMS)
class PaymentWithInsurance extends BasicPayment {
    public override getDescription(): string {
        return super.getDescription() + " + Insurance";
    }
    public override getCost(): number {
        return super.getCost() + 5.0;
    }
}

/* ==================================================================== */
class PaymentWithInsuranceAndSms extends PaymentWithInsurance {
    public override getDescription(): string {
        return super.getDescription() + " + SMS Notification";
    }
    public override getCost(): number {
        return super.getCost() + 2.0;
    }
}

// Execution
const order = new PaymentWithInsuranceAndSms();
console.log(`${order.getDescription()} costs $${order.getCost()}`);