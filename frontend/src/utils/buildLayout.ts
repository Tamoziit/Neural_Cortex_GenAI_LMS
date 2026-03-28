const X_START = 150;
const X_STEP = 350;
const Y_PRESET = [280, 130, 430, 130, 330];

function buildLayout(count: number) {
    const positions = Array.from({ length: count }, (_, i) => ({
        x: X_START + i * X_STEP,
        y: i < Y_PRESET.length ? Y_PRESET[i] : i % 2 === 1 ? 130 : 430,
    }));

    const firstY = positions[0].y;
    let d = `M-100,${firstY} L${positions[0].x},${firstY}`;

    for (let i = 1; i < positions.length; i++) {
        const from = positions[i - 1];
        const to = positions[i];
        // Control points at 3/7 and 4/7 of the x-span — recreates the original curves exactly.
        const cp1x = Math.round(from.x + (to.x - from.x) * 3 / 7);
        const cp2x = Math.round(from.x + (to.x - from.x) * 4 / 7);
        d += ` C${cp1x},${from.y} ${cp2x},${to.y} ${to.x},${to.y}`;
    }

    const last = positions[positions.length - 1];
    d += ` L${last.x + 100},${last.y}`;

    // Canvas width = last pin x + 200 right margin  (e.g. 1750 for 5 modules, 2100 for 6)
    const canvasWidth = last.x + 200;

    return { positions, pathD: d, canvasWidth };
}

export default buildLayout;