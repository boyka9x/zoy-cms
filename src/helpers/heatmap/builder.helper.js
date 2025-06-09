import { HEATMAP_VIEW_PORT } from "@/constants/heatmap.constant";
import { buildMsrElementOverlay, rebuildPosition } from "./click.helper";
import * as h337 from "heatmapjs";
import { renderOverlay } from "./overlay.helper";

export const HeatmapBuilder = {
    buildClicks: ({ type, points, device, totalCounts }) => {
        try {
            const iframe = document.querySelector('#frame-heatmap');
            const iframeDocument = iframe.contentDocument.documentElement;

            iframeDocument.scrollTo(0, 0);
            const msrHmOverlay = buildMsrElementOverlay(iframe);
            if (!msrHmOverlay) return;

            iframeDocument.appendChild(msrHmOverlay);
            iframe.style.pointerEvents = 'all';

            iframeDocument.addEventListener('click', (e) => e.preventDefault(), { once: false });
            if (!msrHmOverlay) return;

            const wrapperEventType = iframeDocument.querySelector(`.overlay_${type}`);
            if (!wrapperEventType) return;

            const heatmap = h337.create({
                container: iframeDocument,
                radius: 20,
                maxOpacity: 0.6,
                minOpacity: 0.1,
                blur: 0.75,
                gradient: {
                    '.25': 'blue',
                    '.55': 'cyan',
                    '.85': 'lime',
                    '.95': 'yellow',
                    '1.0': 'red',
                },
            });

            heatmap.setDataMin(1);
            heatmap.setDataMax(1);

            let rank = 0;
            for (const point of points) {
                rank++;
                const { selector, positions, textContent, counts } = point;
                if (!selector) {
                    continue;
                }

                const element = iframeDocument.querySelector(selector);
                if (!element) {
                    continue;
                }

                // Render position
                let scale = {};
                const original = HEATMAP_VIEW_PORT[device.toUpperCase()];

                scale.x = iframeDocument.clientWidth / original.WIDTH;
                scale.y = iframeDocument.clientHeight / original.HEIGHT;

                const rect = element.getBoundingClientRect();
                for (const position of positions) {
                    const { x, y, counts } = position;

                    const temp = rebuildPosition({
                        rect,
                        x: parseInt(x * scale.x),
                        y: parseInt(y * scale.y),
                    });
                    temp.counts = counts;

                    heatmap.addData({
                        x: temp.x,
                        y: temp.y,
                        value: temp.counts,
                    });
                }

                renderOverlay({
                    rank,
                    rate: Math.round((counts / totalCounts) * 100),
                    container: wrapperEventType,
                    element,
                });
            }
        } catch (error) {
            console.error('Error building clicks:', error);
        }
    }
}