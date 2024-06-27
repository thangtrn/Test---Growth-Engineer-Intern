export interface IOption {
   id: number;
   text: string;
   score: number;
}

export interface IQuestion {
   id: number;
   title: string;
   options: Option[];
   answer: number | null;
}

export interface IResult {
   email: string;
   questions: IQuestion[];
   score: number;
   level: number;
}
