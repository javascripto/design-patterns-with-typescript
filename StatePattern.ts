// State Pattern

interface State {
  order: Order;

  cancelOrder(): void;
  verifyPayment(): void;
  shipOrder(): void;
}

class Order {
  private currentState: State;
  public canceldOrderState: State;
  public paymentPendingState: State;
  public orderShippedState: State;
  public orderBeingPreparedState: State;
  
  constructor() {
    this.canceldOrderState = new CanceldOrderState(this);
    this.paymentPendingState = new PaymentPendingState(this);
    this.orderShippedState = new OrderShippedState(this);
    this.orderBeingPreparedState = new OrderBeingPreparedState(this);

    this.setState(this.paymentPendingState);
  }

  public setState(state: State) {
    this.currentState = state;
  }

  public getState(): State {
    return this.currentState;
  }
}

class PaymentPendingState implements State {
  order: Order;

  constructor(order: Order) {
    this.order = order;
  }

  cancelOrder() {
    console.log("Pedido Cancelado.");
    this.order.setState(this.order.canceldOrderState);
  }

  verifyPayment() {
    console.log("Pagamento verificado");
    this.order.setState(this.order.orderBeingPreparedState);
  }

  shipOrder() {
    console.log("Seu Pedido ainda está processado, não é possivel enviar o produto ainda");
  }
}

class CanceldOrderState implements State {
  order: Order;

  constructor(order: Order) {
    this.order = order;
  }

  cancelOrder() {
    console.log("O pedido Já foi cancelado, não é possivel cancelar novamente");
  }

  verifyPayment() {
    console.log("O pedido Já foi cancelado, não é possivel verificar pagamento");
  }

  shipOrder() {
    console.log("O pedido Já foi cancelado, não é possivel enviar produto");
  }
}

class OrderBeingPreparedState implements State {
  order: Order;

  constructor(order: Order) {
    this.order = order;
  }

  cancelOrder() {
    console.log("Pedido cancelado, seu dinheiro será devolvido");
    this.order.setState(this.order.canceldOrderState);
  }

  verifyPayment() {
    console.log("Seu pagamento já foi verificado");
  }

  shipOrder() {
    console.log("Seu produto está a caminho");
    this.order.setState(this.order.orderShippedState);
  }
}

class OrderShippedState implements State {
  order: Order;

  constructor(order: Order) {
    this.order = order;
  }

  cancelOrder() {
    console.log("Não é possivel cancelar a compra, seu produto já foi enviado");
  }

  verifyPayment() {
    console.log("Seu pagamento ja foi confirmado e seu produto já está a caminho.");
  }

  shipOrder() {
    console.log("Produto já foi enviado");
  }
}

const order = new Order();

order.getState().verifyPayment();
order.getState().cancelOrder();
order.getState().shipOrder();

console.log('Status:', (<any> order.getState()).constructor.name);
