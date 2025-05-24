let overlaySelectedHM;

export const renderOverlay = ({ rank, rate, container, element }) => {
    const rect = element.getBoundingClientRect();
    const overlay = document.createElement('div');

    overlay.dataset.elementId = rank;
    overlay.classList.add('msr_overlay_element', 'msr_element_bounding_box');
    overlay.style.cssText = `
        top: ${rect.top}px; 
        left: ${rect.left}px; 
        width: ${rect.width}px; 
        height: ${rect.height}px; 
        position: absolute; 
        z-index: 9999999999;
        pointer-events: auto;
    `;

    const detailElement = document.createElement('span');
    detailElement.classList.add(
        'msr_element_count',
        'msr_element_detailed',
        rect.top < 12 ? 'bottom_right_placement' : 'top_right_placement'
    );

    const rankElement = document.createElement('span');
    rankElement.classList.add('msr_element_rank');
    rankElement.textContent = `#${rank}`;

    const rateElement = document.createElement('span');
    rateElement.classList.add('msr_element_rate');
    rateElement.textContent = `${rate}%`;

    container.appendChild(overlay);
    overlay.appendChild(detailElement);
    detailElement.appendChild(rankElement);
    detailElement.appendChild(rateElement);

    const insertOverlay = () => {
        let inserted = false;
        for (let i = 0; i < container.children.length; i++) {
            const child = container.children[i];
            const childRect = child.getBoundingClientRect();
            if (rect.top < childRect.top) {
                container.insertBefore(overlay, child);
                inserted = true;
                break;
            }
        }
        if (!inserted) {
            container.appendChild(overlay);
        }
    };

    requestAnimationFrame(() => {
        insertOverlay();
    });

    // Event listeners
    overlay.addEventListener('mouseover', (e) => {
        const isOpen = container.querySelector('.msr_overlay_element.msr_element_hover');
        if (isOpen) {
            overlaySelectedHM = e.target;
            isOpen.classList.remove('msr_element_hover');
        }
        e.target.classList.add('msr_element_hover');
    });

    overlay.addEventListener('mouseleave', (e) => {
        e.target.classList.remove('msr_element_hover');
        if (overlaySelectedHM) {
            overlaySelectedHM.classList.add('msr_element_hover');
        }
    });

    overlay.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const cardElement = document.querySelector(`[data-card-rank='${rank}']`);
        const cardWrapper = document.querySelector(`[data-card-wrapper='click']`);
        const cardSelected = document.querySelector(`[data-card-selected="true"]`);
        const scroll = cardWrapper && cardWrapper.querySelector('[data-card-list="click"]');
        if (cardSelected) {
            cardSelected.setAttribute('data-card-selected', 'false');
        }
        if (cardElement && scroll) {
            cardElement.setAttribute('data-card-selected', 'true');
            scroll.scrollTo({
                top: cardElement.offsetTop - 100,
                behavior: 'smooth',
            });
            const postEvent = new Event('overlay-click');
            cardWrapper.dispatchEvent(postEvent);
        }
    });
};