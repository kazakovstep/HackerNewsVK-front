export interface NewsItem {
    id: number;
    title: string;
    url: string;
    by: string;
    time: string;
    score: number;
    descendants: number;
}

export function formatUnixTimeToDateTime(time: string): string {
    const dateTime = new Date(Number(time) * 1000);
    return dateTime.toLocaleString();
}