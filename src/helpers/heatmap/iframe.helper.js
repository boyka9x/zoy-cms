export function convertSnakeString(text) {
    return Str(text).snake().get();
}

const HEATMAP_TYPE = [
    'click',
    'first-click',
    'last-click',
];

export const IframeBuilder = {
    appendStyleCss: ({ iframeDocument }) => {
        const style = document.createElement('style');
        style.setAttribute('type', 'text/css');
        style.textContent = `
                *::before, *::after {
                  pointer-events: none !important;
                }
            `;
        iframeDocument.appendChild(style);
    },
    supportAnimation: ({ iframe }) => {
        const iframeDoc = iframe.contentWindow.document;
        if (iframeDoc) {
            iframeDoc
                .querySelectorAll('.animate--slide-in, .banner')
                .forEach((item) => (item.style.animation = 'var(--animation-slide-in)'));
        }
    },
    preventEvent: ({ iframeDocument }) => {
        const elements = iframeDocument.querySelectorAll('body *:not(style):not(script)');

        elements.forEach((element) => {
            if (element) {
                element.onclick = (e) => {
                    e.preventDefault();
                };
                element.onsubmit = (e) => {
                    e.preventDefault();
                };
            }
        });

        elements.forEach((element) => {
            if (element) {
                const styleElement = window.getComputedStyle(element);
                const position = styleElement.getPropertyValue('position');
                const visibility = styleElement.getPropertyValue('visibility');
                const opacity = styleElement.getPropertyValue('opacity');

                if (['fixed', 'sticky'].includes(position)) {
                    if (typeof element.className === 'string') {
                        let iframe = document.querySelector('#frame-heatmap');
                        if (iframe) {
                            let width = iframe.offsetWidth;
                            width = parseFloat(width) * 0.64;
                            element.style.position = 'relative';
                            element.style.right = `-${width}px`;
                        }
                    }
                    if (visibility === 'hidden' && opacity === '0') {
                        // do nothing
                    } else {
                        element.style.position = 'initial';
                    }
                }
            }
        });
    },
    appendOverlay({ iframeDocument }) {
        const exitElementOverlay = iframeDocument.querySelector('#msr_element_overlay');
        if (exitElementOverlay) {
            return exitElementOverlay;
        }

        // overlay contains canvas
        const msrElementOverLay = document.createElement('div');
        msrElementOverLay.setAttribute('id', 'msr_element_overlay');
        msrElementOverLay.setAttribute(
            'style',
            `width: ${iframeDocument.offsetWidth}px; height: ${iframeDocument.scrollHeight}px; position: absolute;`
        );

        const msrHeatmapCanvas = document.createElement('div');
        msrHeatmapCanvas.setAttribute('id', 'msr_heatmap_canvas');
        msrHeatmapCanvas.setAttribute(
            'style',
            `width: ${iframeDocument.offsetWidth}px; height: ${iframeDocument.scrollHeight}px; position: absolute;`
        );

        const msrElementOverLayStyle = document.createElement('style');
        msrElementOverLayStyle.setAttribute('type', 'text/css');
        msrElementOverLayStyle.textContent = `
          #msr_element_overlay {
            background-color: transparent;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            position: absolute;
            z-index: 999999999;
            pointer-events: none;
            display: block;
            opacity: 1;
          }
          
          .msr_overlay_element {
            opacity: 0;
            transition-property: opacity;
            transition: .2s ease;
          }
          
          .msr_overlay_element.msr_element_hover {
            opacity: 1;
          }
          
          .msr_element_bounding_box {
            background-color: transparent;
            border: 1px dashed #2196F3;
            bottom: 0;
            cursor: pointer;
            transition-property: background-color;
            transition: .2s ease-in-out;
          }
         
          .msr_element_bounding_box.msr_element_hover {
            background-color: rgba(52, 152, 219, 0.5);
          }
          
          .msr_element_count {
            background-color: #2196F3;
            box-sizing: border-box;
            color: #FFF;
            font-family: 'Helvetica Neue', 'Arial', sans-serif;
            font-weight: bold;
            font-size: 13px;
            line-height: 1;
            min-width: 10px;
            position: absolute;
            transition: .2s transform ease;
            white-space: nowrap;
          }
          
          .msr_element_count span {
            display: inline-block;
            line-height: 11px;
            padding: 4px;
          }
          
          #msr_element_overlay .msr_element_count {
            display: flex;
            pointer-events: none;
          }
        
          #msr_element_overlay .msr_element_detailed {
            padding: 0;
          }
          
          .msr_element_rank {
            background-color: rgba(0,0,0,.25);
            font-weight: 700;
          }
          
          .top_right_placement{
            right:0;
            transform: translate3d(0, -100%, 0);
          }

          .bottom_right_placement{
            right:0;
            bottom:0;
            transform: translate3d(0, 100%, 0);
          }
          #msr_heatmap_canvas > canvas {
            width: 100%;
            height: 100%;
          }
          .heatmap-canvas.test {
            display: none !important;
          }
        `;

        msrElementOverLay.appendChild(msrHeatmapCanvas);
        msrElementOverLay.appendChild(msrElementOverLayStyle);

        return msrElementOverLay;
    },

    renderCanvas({ iframeDocument }) {
        const exitsCanvases = iframeDocument.querySelectorAll('canvas.heatmap-canvas');
        if (exitsCanvases.length === 8) {
            return [];
        }
        const target = iframeDocument.querySelector('#msr_element_overlay > #msr_heatmap_canvas');
        const hmInstances = [];

        for (const type of HEATMAP_TYPE) {
            const rect = target.getBoundingClientRect();
            const canvas = document.createElement('canvas');
            canvas.setAttribute('class', `heatmap-canvas ${type}`);
            canvas.setAttribute('style', 'width: 100%; height: 100%;');
            canvas.setAttribute('width', rect.width);
            canvas.setAttribute('height', rect.height);
            const instance = heat(canvas);

            instance.radius(12, 12);
            instance.gradient({ 0.1: '#ab4bde', 0.4: '#1e91ed', 0.7: '#f7ee92', 1: '#ff5830' });
            target.appendChild(canvas);
            hmInstances.push({ type, instance: instance });
        }

        return hmInstances;
    },

    renderOverlayClick({ iframeDocument }) {
        const existWrapperClick = iframeDocument.querySelector('.overlay_click');
        if (existWrapperClick) return;

        for (const type of HEATMAP_TYPE) {
            const wrapperDiv = document.createElement('div');
            wrapperDiv.setAttribute('class', `overlay_${type}`);
            iframeDocument.appendChild(wrapperDiv);
        }
    },
}