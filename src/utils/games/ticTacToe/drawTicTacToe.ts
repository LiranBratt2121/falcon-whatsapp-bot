import { Canvas, CanvasRenderingContext2D } from "canvas";
import { Line, TickTacToeGridIndex, TicTacToeGameElement } from "../../types";
import { drawLine, drawText } from "../draw";

export const drawTicTacToeGrid = (canvas: Canvas, ctx: CanvasRenderingContext2D, horizontalLines: Array<Line>, verticalLines: Array<Line>) => {
    const interval = { horizontal: Math.floor(canvas.width / 3), vertical: Math.floor(canvas.height / 3) };

    for (let i = 0; i <= canvas.height; i += interval.vertical) {
        horizontalLines.push([[0, i], [canvas.width, i]]);
    }

    for (let i = 0; i <= canvas.width; i += interval.horizontal) {
        verticalLines.push([[i, 0], [i, canvas.height]]);
    }

    horizontalLines.forEach((line) => {
        drawLine(ctx, ...line);
    })

    verticalLines.forEach((line) => {
        drawLine(ctx, ...line);
    })
}

export const drawTicTacToeGameElement = (canvas: Canvas, ctx: CanvasRenderingContext2D, type: TicTacToeGameElement, idx: TickTacToeGridIndex) => {
    const lineStartInterval = { horizontal: Math.floor(canvas.width / 3), vertical: Math.floor(canvas.height / 3) };
    const height = (Math.floor(idx / 3)) * lineStartInterval.vertical + lineStartInterval.vertical / 2;
    const width = (Math.floor(idx % 3)) * lineStartInterval.horizontal + lineStartInterval.horizontal / 2;

    drawText(ctx, type, [width, height], 100, type == TicTacToeGameElement.X ? "red" : "blue");
}
