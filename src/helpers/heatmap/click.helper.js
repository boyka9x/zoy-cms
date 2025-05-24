
export const shortText = (text) => {
  if (!text) return '';

  text = text.replace(/\s+/g, ' ').trim();
  if (text.length > 100) {
    text = text.slice(0, 100).trim();
  }

  return text;
};

export const buildMsrElementOverlay = (iframe) => {
  const iframeDocument = iframe.contentDocument.documentElement;
  const exitElementOverlay = iframeDocument.querySelector('#msr_element_overlay');
  if (exitElementOverlay) {
    return exitElementOverlay;
  }
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
        `;

  msrElementOverLay.appendChild(msrHeatmapCanvas);
  msrElementOverLay.appendChild(msrElementOverLayStyle);

  return msrElementOverLay;
};

export const groupClickPoints = ({ points }) => {
  let totalCounts = 0;
  let pointMap = new Map();

  const iframe = document.querySelector('#frame-heatmap');
  const container = iframe.contentDocument.documentElement;

  for (const point of points) {
    // Check element
    const { selector, textContent, counts, x, y, sessionId = '' } = point;

    const element = container.querySelector(selector);
    if (!element) continue;
    if (textContent !== shortText(element.textContent)) continue;

    const key = `${selector}-${textContent}`;

    const pointValue = pointMap.get(key);

    const sessions = pointValue ? [...pointValue.sessions, sessionId] : [sessionId];
    pointMap.set(key, {
      selector,
      textContent,
      counts: pointValue?.counts ? pointValue.counts + counts : counts,
      positions: pointValue ? [...pointValue.positions, { x, y, counts }] : [{ x, y, counts }],
      sessions: Array.from(new Set(sessions)),
    });

    totalCounts = totalCounts + counts;
  }

  // Calculate and sort
  const rankPoints = [...pointMap.values()];
  rankPoints.sort((a, b) => b.counts - a.counts);

  rankPoints.forEach((point) => {
    point.rate = totalCounts > 0 ? parseFloat(((point.counts / totalCounts) * 100).toFixed(2)) : 0;
  });

  return {
    totalCounts,
    points: rankPoints,
  };
};

export const rebuildPosition = ({ rect, x, y }) => {
  let position = {};

  const finalY =
    y < rect.top
      ? Math.ceil(rect.top + (Math.random() * rect.height) / 2)
      : y > rect.bottom
        ? Math.floor(rect.bottom - (Math.random() * rect.height) / 2)
        : Math.round(y);

  position.x =
    x < rect.left
      ? Math.ceil(rect.left + (Math.random() * rect.width) / 2)
      : x > rect.right
        ? Math.floor(rect.right - (Math.random() * rect.width) / 2)
        : Math.round(x);

  position.y = finalY > 0 ? finalY : -finalY;

  return position;
}