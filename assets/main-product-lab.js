class VariantSelectsLab extends HTMLElement {
  constructor() {
    super();

    this.productData = this.querySelector('[data-product-json]');
    this.variantInput = this.querySelector('input[name="id"][ref="variantId"]');
    this.priceElement = this.querySelector('[data-product-price]');
    this.button = this.querySelector('[ref="addToCartButton"]');
    this.buttonText = this.querySelector('.add-to-cart-text__content');

    this.addEventListener('change', this.onVariantChange.bind(this));
  }

  get product() {
    return JSON.parse(this.productData.textContent);
  }

  get selectedOptions() {
    return Array.from(this.querySelectorAll('.lab-product-options__input:checked')).map((input) => input.value);
  }

  get currentVariant() {
    return this.product.variants.find((variant) => {
      return variant.options.every((option, index) => option === this.selectedOptions[index]);
    });
  }

  onVariantChange() {
    const variant = this.currentVariant;

    if (!variant) return;

    this.variantInput.value = variant.id;
    this.variantInput.setAttribute('value', variant.id);

    this.priceElement.textContent = this.formatMoney(variant.price);

    this.button.disabled = !variant.available;
    this.buttonText.textContent = variant.available ? 'Add to cart' : 'Sold out';

    const url = new URL(window.location.href);
    url.searchParams.set('variant', variant.id);
    window.history.replaceState({}, '', url.toString());
  }

  formatMoney(cents) {
    return (cents / 100).toLocaleString('fr-FR', {
      style: 'currency',
      currency: window.Shopify?.currency?.active || 'EUR',
    });
  }
}

if (!customElements.get('variant-selects-lab')) {
  customElements.define('variant-selects-lab', VariantSelectsLab);
}