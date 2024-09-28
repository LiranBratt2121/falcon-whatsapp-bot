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

