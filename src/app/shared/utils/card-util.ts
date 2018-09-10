export function orderData(data: any, index) {
  const order = [];
  for (let i = 0; i < data.length; i++) {
    if (i % index === 0) {
      order.push([]);
      order[order.length - 1].push(data[i]);
    } else {
      order[order.length - 1].push(data[i]);
    }
  }
  return order;
}
