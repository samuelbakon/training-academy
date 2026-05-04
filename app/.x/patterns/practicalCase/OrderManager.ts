class OrderManager {
  // Creational issues: Hardcoded instantiation.
  // Patterns: Factory, Abstract Factory, Builder, Prototype.
  private db = new LocalStorageDatabase(); 

  // Missing Attributes needed for the methods below
  private inventory: any;
  private marketing: any;
  private analytics: any;

  // Problem: Needs to be a unique instance.
  // Pattern: Singleton.
  constructor() {
    // These should ideally be injected, but here they are tightly coupled
    this.inventory = new InventoryService();
    this.marketing = new MarketingService();
    this.analytics = new AnalyticsService();
    console.log("Manager initialized");
  }

  // Structural issues: Handling incompatible formats internally.
  // Pattern: Adapter.
  syncBank() {
    const rawData = "ID:101;AMT:5000"; 
    const parsed = rawData.split(";"); 
    return { id: parsed[0], amount: parsed[1] };
  }

  // Problem: Nested notification logic.
  // Patterns: Decorator, Bridge, Composite.
  sendNotification(order: any, mode: string) {
    if (mode === "email") { /* ... */ }
    if (mode === "sms") { /* ... */ }
    if (mode === "email+sms") { /* ... */ } 
  }

  // Behavioral issues: Giant conditional blocks for algorithms.
  // Pattern: Strategy.
  calculatePrice(region: string, express: boolean) {
    let price = 5000;
    if (region === "Cameroun") price += 500;
    else if (region === "France") price += 2000;
    
    if (express) price *= 1.5;
    return price;
  }

  // Problem: Complex state management logic.
  // Pattern: State.
  updateStatus(order: any, status: string) {
    if (status === "PAID") {
        if (order.isCanceled) throw new Error("Impossible");
    }
  }

  // Problem: Tightly coupled dependencies.
  // Patterns: Observer, Mediator.
  checkout(order: any) {
    this.db.save(order);
    this.inventory.reduce(order.qty);
    this.marketing.sendCoupon();
    this.analytics.track(order);
  }

  // Problem: Manual traversal of complex collections.
  // Pattern: Iterator.
  printPendingOrders(orders: any[]) {
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].status === "PENDING") {
            console.log(orders[i]);
        }
    }
  }
}

// Dummy classes to allow the code to "exist"
class LocalStorageDatabase { save(data: any) {} }
class InventoryService { reduce(qty: number) {} }
class MarketingService { sendCoupon() {} }
class AnalyticsService { track(data: any) {} }