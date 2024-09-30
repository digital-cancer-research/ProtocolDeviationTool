export interface PdDvdecodBarGraphData {
    dvcats: string[];
    data: PdDvdecod[];
}

export interface PdDvdecod {
    dvcat: string
    dvdecod: string;
    count: number[];
    colour: string;
}