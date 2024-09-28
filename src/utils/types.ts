export enum TimeConvention {
    SECS = Math.pow(10, 3),
    MINS = SECS * 60,
    HOURS = 3.6e6,
    DAYS = 8.64e7,
    NONE = -1
}

export type TimeContainer = {
    timeConvention: TimeConvention;
    timeTitle: string;
    timeToWait: number;
}

export type ChatId = string;
export type ActionWord = string;
export type ActionWordContent = string;

export type Point = [number, number];
export type Line = [Point, Point]

export enum TicTacToeGameElement {
    X = 'X',
    O = 'O'
}

export type TickTacToeGridIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

export enum ImageTypes {
    PNG = "png",
    SVG = "svg+xml"
} 