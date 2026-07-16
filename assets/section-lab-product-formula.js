class LabProductFormula extends HTMLElement {
  constructor() {
    super();

    this.items = Array.from(this.querySelectorAll('[data-formula-item]'));
    this.triggers = Array.from(this.querySelectorAll('[data-formula-trigger]'));
    this.progress = this.querySelector('[data-formula-progress]');
    this.activeIndex = -1;
    this.observer = null;
  }

  connectedCallback() {
    if (!this.items.length || !this.triggers.length) return;

    this.classList.add('is-active');

    if (window.matchMedia('(max-width: 749px)').matches) {
      this.setActiveItem(0);
      return;
    }

    this.createObserver();
    this.setActiveItem(0);
  }

  disconnectedCallback() {
    this.observer?.disconnect();
  }

  createObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((firstEntry, secondEntry) => {
            return secondEntry.intersectionRatio - firstEntry.intersectionRatio;
          });

        const currentEntry = visibleEntries[0];

        if (!currentEntry) return;

        const index = Number(currentEntry.target.dataset.index);

        if (Number.isNaN(index)) return;

        this.setActiveItem(index);
      },
      {
        root: null,
        rootMargin: '-40% 0px -40% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    this.triggers.forEach((trigger) => {
      this.observer.observe(trigger);
    });
  }

  setActiveItem(index) {
    if (index === this.activeIndex) return;

    this.activeIndex = index;

    this.items.forEach((item, itemIndex) => {
      item.classList.toggle('is-active', itemIndex === index);
      item.classList.toggle('is-previous', itemIndex < index);
    });

    this.updateProgress(index);
  }

  updateProgress(index) {
    if (!this.progress) return;

    const totalSteps = this.items.length;
    const progress = totalSteps > 1 ? index / (totalSteps - 1) : 1;

    this.progress.style.transform = `scaleY(${progress})`;
  }
}

if (!customElements.get('lab-product-formula')) {
  customElements.define('lab-product-formula', LabProductFormula);
}