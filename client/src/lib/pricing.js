export const INDIVIDUAL_PRICE = 18;
export const PACK_STICKER_COUNT = 12;
export const PACK_PRICE = 199;
export const FREE_DELIVERY_THRESHOLD = 299;
export const DELIVERY_FEE = 40;

export function getStickerPrice(product) {
  const price = Number(product?.price);
  return Number.isFinite(price) && price > 0 ? price : INDIVIDUAL_PRICE;
}

export function calculateCart(cart) {
  const lines = cart.map((item) => ({
    item,
    quantity: item.quantity,
    lineRawSubtotal: getStickerPrice(item) * item.quantity,
  }));

  const totalStickers = lines.reduce((sum, line) => sum + line.quantity, 0);
  const rawSubtotal = lines.reduce((sum, line) => sum + line.lineRawSubtotal, 0);
  const packCount = Math.floor(totalStickers / PACK_STICKER_COUNT);
  const remainingStickers = totalStickers % PACK_STICKER_COUNT;
  const subtotal = packCount * PACK_PRICE +
    remainingStickers * INDIVIDUAL_PRICE;
  const packSavings = Math.max(0, rawSubtotal - subtotal);
  const deliveryFee =
    subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;

  return {
    lines,
    totalStickers,
    rawSubtotal,
    subtotal,
    packCount,
    remainingStickers,
    packSavings,
    deliveryFee,
    total: subtotal + deliveryFee,
  };
}
