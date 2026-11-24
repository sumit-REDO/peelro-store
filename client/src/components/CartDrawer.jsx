import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, CheckCircle2, MapPin, ShoppingBag, Trash2 } from 'lucide-react';
import {
  calculateCart,
  INDIVIDUAL_PRICE,
  PACK_STICKER_COUNT,
  FREE_DELIVERY_THRESHOLD,
} from '../lib/pricing';

const ADDRESS_STORAGE_KEY = 'peelro_customer_v1';

function loadSavedCustomer() {
  try {
    const raw = localStorage.getItem(ADDRESS_STORAGE_KEY);
    if (!raw) {
      return { name: '', phone: '', address: '', city: '', pincode: '', paymentMethod: 'UPI' };
    }
    const parsed = JSON.parse(raw);
    return {
      name: typeof parsed?.name === 'string' ? parsed.name : '',
      phone: typeof parsed?.phone === 'string' ? parsed.phone : '',
      address: typeof parsed?.address === 'string' ? parsed.address : '',
      city: typeof parsed?.city === 'string' ? parsed.city : '',
      pincode: typeof parsed?.pincode === 'string' ? parsed.pincode : '',
      paymentMethod: parsed?.paymentMethod === 'COD' ? 'COD' : 'UPI',
    };
  } catch {
    return { name: '', phone: '', address: '', city: '', pincode: '', paymentMethod: 'UPI' };
  }
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemove,
  onClearCart,
  onQuickCompletePack,
  onProceedToCheckout,
}) {
  const [step, setStep] = useState('bag');
  const [customer, setCustomer] = useState(loadSavedCustomer);
  const [formError, setFormError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(null);

  const drawerRef = useRef(null);
  const checkoutFormRef = useRef(null);
  const closeButtonRef = useRef(null);
  const confirmationHeadingRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(customer));
    } catch {
      // Ignore storage quota errors
    }
  }, [customer]);

  useEffect(() => {
    if (!isOpen) return undefined;

    previousFocusRef.current = document.activeElement;
    closeButtonRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault();
        setStep('bag');
        setFormError('');
        onClose();
        return;
      }

      if (event.key === 'Tab' && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        previousFocusRef.current.focus();
      }
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (step === 'confirmation') {
      confirmationHeadingRef.current?.focus();
    }
  }, [step]);

  if (!isOpen) return null;

  const cartSummary = calculateCart(cart);
  const {
    totalStickers,
    rawSubtotal,
    subtotal: discountedSubtotal,
    packCount,
    remainingStickers,
    packSavings,
    deliveryFee,
    total: finalTotal,
  } = cartSummary;
  const amountForFreeDelivery = Math.max(
    0,
    FREE_DELIVERY_THRESHOLD - discountedSubtotal
  );
  const freeDeliveryProgress = Math.min(
    100,
    Math.round((discountedSubtotal / FREE_DELIVERY_THRESHOLD) * 100)
  );
  const isExactPackComplete = packCount > 0 && remainingStickers === 0;
  const packProgress = totalStickers === 0
    ? 0
    : isExactPackComplete
      ? 100
      : Math.min(100, Math.round((remainingStickers / PACK_STICKER_COUNT) * 100));
  const packProgressTarget =
    totalStickers > PACK_STICKER_COUNT && remainingStickers > 0
      ? (packCount + 1) * PACK_STICKER_COUNT
      : Math.max(totalStickers, PACK_STICKER_COUNT);
  const imageFallback = '/stickers/calendar-wtf.png';

  const handleClose = () => {
    setStep('bag');
    setFormError('');
    setFieldErrors({});
    onClose();
  };

  const handleFieldChange = (field, value) => {
    setFormError('');
    setFieldErrors((previous) => ({ ...previous, [field]: '' }));
    setCustomer((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitOrder = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    const cleanPhone = customer.phone.replace(/\D/g, '');
    const cleanPin = customer.pincode.replace(/\D/g, '');
    const errors = {};

    if (!customer.name.trim()) {
      errors.name = 'Enter your full name.';
    }
    if (cleanPhone.length !== 10) {
      errors.phone = 'Enter a valid 10-digit mobile number.';
    }
    if (!customer.address.trim()) {
      errors.address = 'Enter your delivery address.';
    }
    if (!customer.city.trim()) {
      errors.city = 'Enter your city.';
    }
    if (cleanPin.length !== 6) {
      errors.pincode = 'Enter a valid 6-digit PIN code.';
    }
    if (!['UPI', 'COD'].includes(customer.paymentMethod)) {
      errors.paymentMethod = 'Choose a payment preference.';
    }

    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      const firstInvalidField = Object.keys(errors)[0];
      const input = checkoutFormRef.current?.querySelector(
        `[name="${firstInvalidField}"]`
      );
      window.requestAnimationFrame(() => input?.focus());
      return;
    }

    const whatsappWindow = window.open('about:blank', '_blank');
    if (whatsappWindow) {
      whatsappWindow.document.title = 'Preparing your PEELRO order';
      whatsappWindow.document.body.textContent = 'Preparing WhatsApp order…';
    }

    setFormError('');
    setIsSubmitting(true);
    try {
      const confirmation = await onProceedToCheckout({
        cart,
        totalStickers,
        subtotal: discountedSubtotal,
        deliveryFee,
        finalTotal,
        customer: {
          ...customer,
          name: customer.name.trim(),
          phone: cleanPhone,
          address: customer.address.trim(),
          city: customer.city.trim(),
          pincode: cleanPin,
        },
      });
      if (whatsappWindow && !whatsappWindow.closed) {
        whatsappWindow.location.replace(confirmation.whatsappUrl);
      }
      setOrderConfirmation(confirmation);
      setStep('confirmation');
    } catch (error) {
      if (whatsappWindow && !whatsappWindow.closed) {
        whatsappWindow.close();
      }
      setFormError(error.message || 'Check your order details and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDoneAndClearBag = () => {
    onClearCart?.();
    setStep('bag');
    setOrderConfirmation(null);
    setFormError('');
    setFieldErrors({});
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
    >
      <button
        type="button"
        tabIndex={-1}
        className="absolute inset-0 h-full w-full cursor-default bg-black/75 backdrop-blur-xs"
        onClick={handleClose}
        aria-label="Close shopping bag"
      />

      <div className="fixed inset-y-0 right-0 flex w-full max-w-full pl-0 sm:pl-10">
        <aside
          ref={drawerRef}
          className="flex h-full w-full flex-col border-l border-[#1F4A52] bg-[#0A1518] shadow-2xl sm:max-w-md"
        >
          <header className="flex items-center justify-between border-b border-[#1F4A52] bg-[#1A1F22] px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              {step === 'address' && (
                <button
                  type="button"
                  onClick={() => {
                    setStep('bag');
                    setFormError('');
                  }}
                  className="inline-flex min-h-11 min-w-11 items-center justify-center border border-[#1F4A52] bg-[#0A1518] text-[#8B8F8E] transition-colors hover:border-[#B50B16] hover:text-white"
                  aria-label="Back to bag"
                >
                  <ArrowLeft size={16} />
                </button>
              )}
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-[#8B8F8E]">
                  {step === 'bag'
                    ? 'PEELRO'
                    : step === 'address'
                      ? 'STEP 2 OF 3 · SHIPPING'
                      : 'STEP 3 OF 3 · CONFIRMATION'}
                </p>
                <h2
                  id="cart-drawer-title"
                  className="font-serif text-base font-bold tracking-tight text-white"
                >
                  {step === 'bag'
                    ? `Bag [${totalStickers}]`
                    : step === 'address'
                      ? 'Delivery Details'
                      : orderConfirmation?.backupSaved
                        ? 'Order Saved'
                        : 'Order Ready'}
                </h2>
              </div>
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={handleClose}
              className="min-h-11 min-w-11 text-xl text-[#8B8F8E] transition-colors hover:text-[#FFFACD] focus-visible:outline-2 focus-visible:outline-white"
              aria-label="Close bag"
            >
              ×
            </button>
          </header>

          {step === 'bag' ? (
            <>
              <div className="space-y-4 border-b border-[#1F4A52] bg-[#1A1F22] p-4">
                <div>
                  <div className="mb-1.5 flex justify-between gap-3 text-xs font-medium text-white">
                    {amountForFreeDelivery > 0 ? (
                      <span>
                        Add <strong className="text-[#FFFACD]">₹{amountForFreeDelivery}</strong> more for free delivery
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 font-semibold text-[#A38C5A]">
                        <CheckCircle2 size={14} /> Free delivery unlocked.
                      </span>
                    )}
                    <span className="text-[#8B8F8E]">{freeDeliveryProgress}%</span>
                  </div>
                  <div className="h-1 w-full overflow-hidden bg-[#1F4A52]">
                    <div
                      className="h-full bg-[#FF0E1A] transition-all duration-300"
                      style={{ width: `${freeDeliveryProgress}%` }}
                    />
                  </div>
                  <p className="mt-1 text-[10px] text-[#8B8F8E]">
                    Free delivery over ₹299, based on the discounted subtotal.
                  </p>
                </div>

                <div className="border-y border-[#1F4A52] bg-[#0A1518] px-3 py-3 text-xs">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-bold text-white">★ Studio Offer: 12 Stickers for ₹199</span>
                    <span className="font-semibold text-[#FFFACD]">
                      {totalStickers}/{packProgressTarget}
                    </span>
                  </div>
                  <div className="mt-2 h-1 w-full overflow-hidden bg-[#1F4A52]">
                    <div
                      className="h-full bg-[#FF0E1A] transition-all duration-300"
                      style={{ width: `${packProgress}%` }}
                    />
                  </div>
                  <p className="mt-2 text-[#8B8F8E]">
                    {totalStickers === 0
                      ? 'Add any 12 stickers to unlock ₹199.'
                      : isExactPackComplete
                        ? `${packCount} pack${packCount === 1 ? '' : 's'} unlocked. Add 12 more for Pack #${packCount + 1}.`
                        : totalStickers > PACK_STICKER_COUNT
                          ? `${packCount} pack${packCount === 1 ? '' : 's'} unlocked, add ${PACK_STICKER_COUNT - remainingStickers} more for Pack #${packCount + 1}.`
                          : `Add ${PACK_STICKER_COUNT - remainingStickers} more to complete your first ₹199 pack.`}
                  </p>
                  {remainingStickers > 0 && (
                    <button
                      type="button"
                      onClick={onQuickCompletePack}
                      className="mt-3 min-h-11 w-full border border-[#FF0E1A] bg-[#FF0E1A] px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#B50B16]"
                    >
                      Quick Complete Pack (+{12 - remainingStickers} Random Sticker
                      {12 - remainingStickers === 1 ? '' : 's'})
                    </button>
                  )}
                </div>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto p-4">
                {cart.length === 0 ? (
                  <div className="py-20 text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center border border-[#1F4A52] bg-[#1A1F22] text-[#FFFACD]">
                      <ShoppingBag size={20} />
                    </div>
                    <p className="font-serif text-base font-bold text-white">Your bag is empty</p>
                    <p className="mx-auto mt-1 max-w-xs text-xs text-[#8B8F8E]">
                      Choose a few stickers and build your ₹199 pack.
                    </p>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="mt-5 min-h-11 bg-[#FF0E1A] px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#B50B16]"
                    >
                      Shop stickers
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between text-[11px] text-[#8B8F8E]">
                      <span>{cart.length} design{cart.length > 1 ? 's' : ''} in bag</span>
                      {onClearCart && (
                        <button
                          type="button"
                          onClick={onClearCart}
                          className="inline-flex min-h-11 items-center gap-1 text-[#8B8F8E] transition-colors hover:text-[#FFFACD]"
                        >
                          <Trash2 size={12} />
                          <span>Clear bag</span>
                        </button>
                      )}
                    </div>

                    {cart.map((item) => {
                      const imageSource = item.imageUrl || imageFallback;
                      const unitPrice = Number(item.price) > 0 ? Number(item.price) : INDIVIDUAL_PRICE;

                      return (
                        <div
                          key={item._id}
                          className="flex items-center gap-3 border-b border-[#1F4A52] bg-[#1A1F22] p-3"
                        >
                          <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden border border-[#1F4A52] bg-[#0A1518] p-1">
                            <img
                              src={imageSource}
                              alt={item.title}
                              width={56}
                              height={56}
                              loading="lazy"
                              decoding="async"
                              className="h-full w-full object-contain"
                              onError={(event) => {
                                event.currentTarget.onerror = null;
                                event.currentTarget.src = imageFallback;
                              }}
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="truncate font-serif text-xs font-bold text-white">{item.title}</h3>
                            <p className="mt-0.5 text-[11px] text-[#8B8F8E]">
                              ₹{unitPrice} each · <span className="font-semibold text-white">₹{unitPrice * item.quantity}</span>
                            </p>
                          </div>
                          <div className="flex shrink-0 items-center gap-1">
                            <div className="flex items-center overflow-hidden border border-[#1F4A52] bg-[#0A1518]">
                              <button
                                type="button"
                                onClick={() => onUpdateQuantity(item._id, -1)}
                                className="min-h-11 min-w-11 px-2.5 text-base text-[#8B8F8E] hover:bg-[#1A1F22]"
                                aria-label={`Decrease ${item.title} quantity`}
                              >
                                −
                              </button>
                              <span className="px-1 text-xs font-bold text-white">{item.quantity}</span>
                              <button
                                type="button"
                                onClick={() => onUpdateQuantity(item._id, 1)}
                                className="min-h-11 min-w-11 px-2.5 text-base text-[#8B8F8E] hover:bg-[#1A1F22]"
                                aria-label={`Increase ${item.title} quantity`}
                              >
                                +
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => onRemove(item._id)}
                              className="min-h-11 min-w-11 text-lg text-[#8B8F8E] transition-colors hover:text-[#FFFACD]"
                              aria-label={`Remove ${item.title}`}
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>

              {cart.length > 0 && (
                <footer className="space-y-3 border-t border-[#1F4A52] bg-[#1A1F22] p-4">
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-[#8B8F8E]">
                      <span>Items subtotal ({totalStickers} stickers)</span>
                      <span>₹{rawSubtotal}</span>
                    </div>
                    {packSavings > 0 && (
                      <div className="flex justify-between font-medium text-[#A38C5A]">
                        <span>Studio pack savings</span>
                        <span>-₹{packSavings}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-[#8B8F8E]">
                      <span>Delivery</span>
                      <span>{deliveryFee === 0 ? 'FREE' : '₹40'}</span>
                    </div>
                    <div className="flex justify-between border-t border-[#1F4A52] pt-2 text-base font-bold text-white">
                      <span>Total to pay</span>
                      <span className="text-[#FFFACD]">₹{finalTotal}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep('address')}
                    className="min-h-12 w-full bg-[#FF0E1A] py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#B50B16]"
                  >
                    Proceed to buy · ₹{finalTotal}
                  </button>
                </footer>
              )}
            </>
          ) : step === 'confirmation' ? (
            <section className="flex flex-1 flex-col justify-between gap-6 overflow-y-auto p-5">
              <div className="space-y-5">
                <div className="border border-[#1F4A52] bg-[#1A1F22] p-5">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center border border-[#1F4A52] bg-[#0D2F36] text-[#FFFACD]">
                    <CheckCircle2 size={22} />
                  </div>
                  <h3
                    ref={confirmationHeadingRef}
                    tabIndex={-1}
                    className="font-serif text-xl font-bold text-white focus:outline-none"
                  >
                    {orderConfirmation?.backupSaved
                      ? 'Order saved'
                      : 'Order ready to send'}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#8B8F8E]">
                    {orderConfirmation?.backupSaved
                      ? 'We saved a backup of your order. Send it on WhatsApp to confirm it with PEELRO.'
                      : 'We could not save a server backup right now. Your order details are ready—send them on WhatsApp so PEELRO can confirm.'}
                  </p>
                </div>

                <div className="border border-[#1F4A52] bg-[#0D2F36] p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-[#8B8F8E]">
                    Order reference
                  </p>
                  <p className="mt-1 font-mono text-lg font-bold text-[#FFFACD]">
                    {orderConfirmation?.orderNumber}
                  </p>
                  {orderConfirmation?.backupSaved === false && (
                    <p className="mt-2 text-xs leading-5 text-[#8B8F8E]">
                      This is a temporary reference; it is not stored in MongoDB.
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2 border-t border-[#1F4A52] pt-4">
                <button
                  type="button"
                  onClick={() => {
                    if (orderConfirmation?.whatsappUrl) {
                      window.open(
                        orderConfirmation.whatsappUrl,
                        '_blank',
                        'noopener,noreferrer'
                      );
                    }
                  }}
                  className="min-h-12 w-full bg-[#FF0E1A] px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[#B50B16]"
                >
                  Re-open WhatsApp
                </button>
                <button
                  type="button"
                  onClick={handleDoneAndClearBag}
                  className="min-h-12 w-full border border-[#1F4A52] bg-[#1A1F22] px-4 py-3 text-sm font-semibold text-white transition-colors hover:border-[#B50B16]"
                >
                  Done / Clear Bag
                </button>
              </div>
            </section>
          ) : (
            <form
              ref={checkoutFormRef}
              onSubmit={handleSubmitOrder}
              noValidate
              className="flex flex-1 flex-col overflow-hidden"
            >
              <div className="flex-1 space-y-3.5 overflow-y-auto p-4">
                <div className="flex items-start gap-2.5 border border-[#1F4A52] bg-[#1A1F22] p-3 text-xs text-[#8B8F8E]">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-[#FFFACD]" />
                  <span>
                    Packed flat in rigid board mailers from Barrackpore. Dispatched within 24–48 hours.
                  </span>
                </div>

                <div>
                  <label htmlFor="checkout-name" className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-[#8B8F8E]">
                    Full Name
                  </label>
                  <input
                    id="checkout-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    inputMode="text"
                    aria-invalid={Boolean(fieldErrors.name)}
                    aria-describedby={fieldErrors.name ? 'checkout-name-error' : undefined}
                    value={customer.name}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
                    placeholder="e.g. Sumit Poddar"
                    className="min-h-11 w-full border border-[#1F4A52] bg-[#1A1F22] px-3 text-xs text-white placeholder:text-[#8B8F8E]/60 focus:border-[#FF0E1A] focus:outline-none"
                  />
                  {fieldErrors.name && (
                    <p id="checkout-name-error" role="alert" className="mt-1 text-xs text-[#FFFACD]">
                      {fieldErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="checkout-phone" className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-[#8B8F8E]">
                    WhatsApp / Mobile Number
                  </label>
                  <input
                    id="checkout-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    aria-invalid={Boolean(fieldErrors.phone)}
                    aria-describedby={fieldErrors.phone ? 'checkout-phone-error' : undefined}
                    value={customer.phone}
                    inputMode="numeric"
                    maxLength={10}
                    pattern="[0-9]{10}"
                    onChange={(e) =>
                      handleFieldChange('phone', e.target.value.replace(/\D/g, '').slice(0, 10))
                    }
                    placeholder="10-digit mobile number"
                    className="min-h-11 w-full border border-[#1F4A52] bg-[#1A1F22] px-3 text-xs text-white placeholder:text-[#8B8F8E]/60 focus:border-[#FF0E1A] focus:outline-none"
                  />
                  {fieldErrors.phone && (
                    <p id="checkout-phone-error" role="alert" className="mt-1 text-xs text-[#FFFACD]">
                      {fieldErrors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="checkout-address" className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-[#8B8F8E]">
                    Full Delivery Address
                  </label>
                  <textarea
                    id="checkout-address"
                    name="address"
                    rows={2}
                    autoComplete="street-address"
                    inputMode="text"
                    aria-invalid={Boolean(fieldErrors.address)}
                    aria-describedby={fieldErrors.address ? 'checkout-address-error' : undefined}
                    value={customer.address}
                    onChange={(e) => handleFieldChange('address', e.target.value)}
                    placeholder="House / Hostel, Street, Landmark"
                    className="w-full border border-[#1F4A52] bg-[#1A1F22] p-3 text-xs text-white placeholder:text-[#8B8F8E]/60 focus:border-[#FF0E1A] focus:outline-none"
                  />
                  {fieldErrors.address && (
                    <p id="checkout-address-error" role="alert" className="mt-1 text-xs text-[#FFFACD]">
                      {fieldErrors.address}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="checkout-city" className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-[#8B8F8E]">
                      City / State
                    </label>
                    <input
                      id="checkout-city"
                      name="city"
                      type="text"
                      autoComplete="address-level2"
                      inputMode="text"
                      aria-invalid={Boolean(fieldErrors.city)}
                      aria-describedby={fieldErrors.city ? 'checkout-city-error' : undefined}
                      value={customer.city}
                      onChange={(e) => handleFieldChange('city', e.target.value)}
                      placeholder="Kolkata, WB"
                      className="min-h-11 w-full border border-[#1F4A52] bg-[#1A1F22] px-3 text-xs text-white placeholder:text-[#8B8F8E]/60 focus:border-[#FF0E1A] focus:outline-none"
                    />
                    {fieldErrors.city && (
                      <p id="checkout-city-error" role="alert" className="mt-1 text-xs text-[#FFFACD]">
                        {fieldErrors.city}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="checkout-pin" className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-[#8B8F8E]">
                      PIN Code
                    </label>
                    <input
                      id="checkout-pin"
                      name="pincode"
                      type="text"
                      inputMode="numeric"
                      autoComplete="postal-code"
                      maxLength={6}
                      pattern="[0-9]{6}"
                      aria-invalid={Boolean(fieldErrors.pincode)}
                      aria-describedby={fieldErrors.pincode ? 'checkout-pin-error' : undefined}
                      value={customer.pincode}
                      onChange={(e) =>
                        handleFieldChange('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))
                      }
                      placeholder="700120"
                      className="min-h-11 w-full border border-[#1F4A52] bg-[#1A1F22] px-3 text-xs text-white placeholder:text-[#8B8F8E]/60 focus:border-[#FF0E1A] focus:outline-none"
                    />
                    {fieldErrors.pincode && (
                      <p id="checkout-pin-error" role="alert" className="mt-1 text-xs text-[#FFFACD]">
                        {fieldErrors.pincode}
                      </p>
                    )}
                  </div>
                </div>

                <div
                  role="group"
                  aria-label="Payment preference"
                  aria-invalid={Boolean(fieldErrors.paymentMethod)}
                  aria-describedby={fieldErrors.paymentMethod ? 'checkout-payment-error' : undefined}
                >
                  <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-[#8B8F8E]">
                    Payment Preference
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      aria-pressed={customer.paymentMethod === 'UPI'}
                      onClick={() => handleFieldChange('paymentMethod', 'UPI')}
                      className={`min-h-11 border px-3 py-2 text-xs font-semibold transition-colors ${
                        customer.paymentMethod === 'UPI'
                          ? 'border-[#FF0E1A] bg-[#FF0E1A] text-white'
                          : 'border-[#1F4A52] bg-[#1A1F22] text-[#8B8F8E] hover:border-[#B50B16]'
                      }`}
                    >
                      UPI / GPay / PhonePe
                    </button>
                    <button
                      type="button"
                      aria-pressed={customer.paymentMethod === 'COD'}
                      onClick={() => handleFieldChange('paymentMethod', 'COD')}
                      className={`min-h-11 border px-3 py-2 text-xs font-semibold transition-colors ${
                        customer.paymentMethod === 'COD'
                          ? 'border-[#FF0E1A] bg-[#FF0E1A] text-white'
                          : 'border-[#1F4A52] bg-[#1A1F22] text-[#8B8F8E] hover:border-[#B50B16]'
                      }`}
                    >
                      Cash on Delivery
                    </button>
                  </div>
                  {fieldErrors.paymentMethod && (
                    <p id="checkout-payment-error" role="alert" className="mt-1 text-xs text-[#FFFACD]">
                      {fieldErrors.paymentMethod}
                    </p>
                  )}
                </div>

                {formError && (
                  <p role="alert" className="border border-[#FF0E1A]/40 bg-[#FF0E1A]/10 px-3 py-2 text-xs text-[#FFFACD]">
                    {formError}
                  </p>
                )}
              </div>

              <footer className="space-y-2 border-t border-[#1F4A52] bg-[#1A1F22] p-4">
                <div className="flex justify-between text-xs text-[#8B8F8E]">
                  <span>{totalStickers} stickers · {deliveryFee === 0 ? 'FREE delivery' : '₹40 delivery'}</span>
                  <span className="font-bold text-[#FFFACD]">Total: ₹{finalTotal}</span>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  className="min-h-12 w-full bg-[#FF0E1A] py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#B50B16] disabled:cursor-wait disabled:opacity-70"
                >
                  {isSubmitting
                    ? 'Saving order…'
                    : `Confirm & Send Order · ₹${finalTotal}`}
                </button>
              </footer>
            </form>
          )}
        </aside>
      </div>
    </div>
  );
}