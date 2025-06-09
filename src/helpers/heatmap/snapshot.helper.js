import { createCache, createMirror, rebuild } from "rrweb-snapshot";
import { IframeBuilder } from "./iframe.helper";

export const SnapshotHelper = {
    build: async (snapshot) => {
        try {
            const iframe = document.getElementById('frame-heatmap');
            if (!iframe) {
                return {
                    iframe: null,
                    hmInstances: [],
                };
            }

            let cache = createCache();
            let mirror = createMirror();

            rebuild(snapshot.node, {
                doc: iframe.contentDocument,
                hackCss: true,
                afterAppend: (node) => {
                    if (node.tagName === 'use') {
                        const hrefAttribute = node.attributes.href;
                        if (hrefAttribute && hrefAttribute.value.includes('#icon-search')) {
                            hrefAttribute.value = '#icon-search';
                        }
                    }
                },
                cache,
                mirror,
            });

            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 1000);
            });

            const iframeDocument = iframe.contentDocument.documentElement;
            IframeBuilder.appendStyleCss({ iframeDocument });
            IframeBuilder.supportAnimation({ iframe });
            IframeBuilder.preventEvent({ iframeDocument });

            // Render overlay
            const overlay = IframeBuilder.appendOverlay({ iframeDocument });
            iframeDocument.append(overlay);

            // Render overlay click
            IframeBuilder.renderOverlayClick({ iframeDocument });

            // Render canvas
            const hmInstances = IframeBuilder.renderCanvas({ iframeDocument });

            return {
                iframe,
                hmInstances,
            };
        } catch (error) {
            console.log("Error building snapshot:", error);
        }
    },
}