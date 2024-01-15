export enum OrderStatus {
  Open = "OPEN",
  Approved = "APPROVED",
  Confirmed = "CONFIRMED",
  Sent = "SENT",
  Completed = "COMPLETED",
  Cancelled = "CANCELLED",
  Ordered = "ORDERED",
}

export const ORDER_STATUS_FLOW = Object.values(OrderStatus);
