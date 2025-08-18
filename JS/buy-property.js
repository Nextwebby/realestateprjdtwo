document.addEventListener('DOMContentLoaded', () => {

    const filterBtn = document.querySelector('.btn-filter');
    if (filterBtn) {
        filterBtn.addEventListener('click', () => {
            document.querySelector('.filters-form').classList.remove('d-none');
        });
        filterBtn.addEventListener('mouseenter', () => {
            const icon = filterBtn.querySelector('i');
            icon.classList.replace('bi-funnel', 'bi-funnel-fill')
        })
        filterBtn.addEventListener('mouseleave', () => {
            const icon = filterBtn.querySelector('i');
            icon.classList.replace('bi-funnel-fill', 'bi-funnel')
        })
        document.querySelector('.filters-form').addEventListener('mouseleave', () => {
            document.querySelector('.filters-form').classList.add('d-none');
        });
    }

    // Filters
    document.getElementById('property-type').addEventListener('change', (e) => {
        filters.type = e.target.value;
        filters.applyFilters();
    });

    document.getElementById('price').addEventListener('change', (e) => {
        filters.price = e.target.value;
        filters.applyFilters();
    });

    class Filters {
        constructor(type, price) {
            this.type = type;
            this.price = price;
        }

        cards = document.querySelectorAll('.items .card');
        delay = 0;

        priceConvert(value) {
            value = value.toUpperCase().trim();
            if (value.endsWith("K")) {
                return parseInt(value) * 1000;
            } else if (value.endsWith("L")) {
                return parseInt(value) * 100000;
            } else if (value.endsWith("CR")) {
                return parseInt(value) * 10000000;
            }
            return parseInt(value.replace(/,/g, "")) || 0;
        }

        applyFilters() {
            this.delay = 0;

            this.cards.forEach(card => {
                card.parentElement.classList.remove('d-block', 'd-none');
                const removeAttribute = ['data-aos', 'data-aos-delay', 'data-aos-duration']

                removeAttribute.forEach(att => {
                    card.removeAttribute(att);
                });

                const cardPrice = card.querySelector('.price');
                const cardPriceConverted = cardPrice ? this.priceConvert(cardPrice.innerText) : 0;

                let showCard = true;

                if (this.type !== 'Select Type') {
                    showCard = card.classList.contains(`type-${this.type}`);
                }

                if (this.price !== 'Select Price') {
                    let matchesPrice = false;
                    if (this.price === 'less than 300K') {
                        matchesPrice = cardPriceConverted < 300000;
                    } else {
                        const selectedPriceConverted = this.priceConvert(this.price);
                        matchesPrice = cardPriceConverted > selectedPriceConverted;
                    }
                    showCard = showCard && matchesPrice;
                }

                if (showCard) {
                    document.querySelector('.see-more').classList.add('d-none');
                    setTimeout(() => {
                        card.parentElement.classList.add('d-block', 'pop-up');
                    }, this.delay);
                    this.delay += 200;
                } else {
                    card.parentElement.classList.add('d-none');
                }
            });
        }
    }

    const filters = new Filters(
        document.getElementById('property-type').value,
        document.getElementById('price').value
    );


    // See More
    function seeMore() {
        const btn = document.querySelector('.see-more');
        const hiddenCards = document.querySelectorAll('.items .show');
        let currentIndex = 0;
    
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
    
                let count = 0;
                hiddenCards.forEach((card, index) => {
                    if (index >= currentIndex && count < 4) {
                        setTimeout(() => {
                            card.classList.remove('d-none');
                            card.classList.add('pop-up');
                        }, count * 200)
                        count++;
                    }
                });
    
                currentIndex += 4;
    
                if (currentIndex >= hiddenCards.length) {
                    btn.style.display = 'none';
                } else {
                    btn.style.display = 'block';
                }
            });
        }
    }

    seeMore()

    const closeBtn = document.querySelector('.btn-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector('.filters-form').classList.add('d-none');
        });
    }

});
