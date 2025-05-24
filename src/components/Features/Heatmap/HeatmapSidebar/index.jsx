import { Alert, Snackbar, Typography } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { HeatmapCard } from '../HeatmapCard';
import { RecordingModal } from '../RecordingModal';

export const HeatmapSidebar = ({ total, data }) => {
    const wrapperCard = useRef(null);

    const [active, setActive] = useState(false);
    const [selected, setSelected] = useState(null);
    const [itemView, setItemView] = useState({});
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!wrapperCard.current) return;

        const handleOverlayClick = () => {
            const selectedCard = wrapperCard.current.querySelector('[data-card-selected="true"]');
            const rank = selectedCard.getAttribute('data-card-rank');
            setSelected(parseInt(rank));
        };

        wrapperCard.current.addEventListener('overlay-click', handleOverlayClick);

        return () => {
            if (!wrapperCard.current) return;
            wrapperCard.current.removeEventListener('overlay-click', handleOverlayClick);
        };
    }, [wrapperCard, data]);

    const handleCopyElement = useCallback((query) => {
        if (!navigator) return;
        navigator.clipboard.writeText(query).then(() => {
            setCopied(true);
        });
    }, []);

    const handleCardSelect = useCallback(
        (index, type) => {
            setSelected(index);
            const iframe = document.querySelector('#frame-heatmap');
            if (iframe) {
                const iframeDocument = iframe.contentWindow.document;
                const overlays = iframeDocument.querySelectorAll('[data-element-id]');
                overlays.forEach((i) => {
                    i.classList.remove('msr_element_hover');
                });

                const target = iframeDocument.querySelector(
                    `.overlay_${type} [data-element-id="${index}"]`
                );
                if (target) {
                    target.classList.add('msr_element_hover');
                    iframe.contentWindow.scrollTo({
                        top: target.offsetTop - 200,
                        behavior: 'smooth',
                    });
                }
            }
        },
        [selected]
    );

    const handleCardChange = useCallback((index, type) => {
        const iframe = document.querySelector('#frame-heatmap');
        if (iframe) {
            const iframeDocument = iframe.contentWindow.document;
            const overlays = iframeDocument.querySelectorAll('[data-element-id]');
            overlays.forEach((i) => {
                i.classList.remove('msr_element_hover');
            });

            if (index !== null) {
                const target = iframeDocument.querySelector(
                    `.overlay_${type} [data-element-id="${index}"]`
                );
                if (target) {
                    target.classList.add('msr_element_hover');
                    iframe.contentWindow.scrollTo({
                        top: target.offsetTop - 200,
                        behavior: 'smooth',
                    });
                }
            }
        }
    }, []);

    const toggleViewModal = useCallback(() => {
        setActive((prev) => !prev);
    }, []);

    const handleViewClick = useCallback((item) => {
        setActive(true);
        console.log(item);
        setItemView(item);
    }, []);

    return (
        <div
            data-card-wrapper='click'
            ref={wrapperCard}
            style={{
                height: '100%',
                backgroundColor: '#fff',
                borderRadius: '8px',
                padding: '16px',
            }}
        >
            <Typography variant='subtitle1' gutterBottom>
                Elements in order of number of clicks
            </Typography>
            <Typography variant='body2' color='textSecondary' gutterBottom>
                {total} clicks | {data?.length} elements
            </Typography>

            <div
                data-card-list='click'
                style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 260px)' }}
            >
                {data?.map((item, index) => {
                    return (
                        <HeatmapCard
                            index={index + 1}
                            selected={selected}
                            item={item}
                            onView={handleViewClick}
                            onSelect={handleCardSelect}
                            onChange={handleCardChange}
                            onCopy={handleCopyElement}
                        />
                    );
                })}
            </div>

            <RecordingModal
                open={active}
                onClose={() => setActive(false)}
                sessionIds={itemView?.sessions}
            />

            <Snackbar
                open={copied}
                autoHideDuration={2000}
                onClose={() => setCopied(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity='success' onClose={() => setCopied(false)} sx={{ width: '100%' }}>
                    Copied to clipboard!
                </Alert>
            </Snackbar>
        </div>
    );
};
