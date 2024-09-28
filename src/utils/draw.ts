import { createCanvas, CanvasRenderingContext2D, Canvas } from 'canvas'
import { ImageTypes, Line, Point, TicTacToeGameElement } from './types';
import { drawTicTacToeGameElement, drawTicTacToeGrid } from '../games/ticTacToe/drawTicTacToe';
import { sendPathAsSticker } from './send';
import { Message } from 'whatsapp-web.js';

export const drawLine = (ctx: CanvasRenderingContext2D, p1: Point, p2: Point, color?: string, lineWidth?: number) => {
    ctx.strokeStyle = color ?? 'black';
    ctx.lineWidth = lineWidth ?? 5;

    ctx.beginPath();
    ctx.moveTo(...p1);
    ctx.lineTo(...p2);
    ctx.stroke();
}

export const drawText = (ctx: CanvasRenderingContext2D, content: string, location: Point, size?: number, color?: string) => {
    ctx.font = `${size ?? 12}px Arial`;
    ctx.fillStyle = color ?? "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(content, ...location);
}

// TEST function for development!
export const draw = (message: Message) => {
    const canvas = createCanvas(640, 480)
    const ctx = canvas.getContext("2d");

    let horizontalLines: Array<Line> = [];
    let verticalLines: Array<Line> = [];

    drawTicTacToeGrid(canvas, ctx, horizontalLines, verticalLines);
    drawTicTacToeGameElement(canvas, ctx, TicTacToeGameElement.X, 0);
    drawTicTacToeGameElement(canvas, ctx, TicTacToeGameElement.X, 2);
    drawTicTacToeGameElement(canvas, ctx, TicTacToeGameElement.O, 4);
    drawTicTacToeGameElement(canvas, ctx, TicTacToeGameElement.O, 5);
    drawTicTacToeGameElement(canvas, ctx, TicTacToeGameElement.X, 8);

    sendPathAsSticker(canvas.toDataURL().split(',')[1], ImageTypes.PNG, message);
}
