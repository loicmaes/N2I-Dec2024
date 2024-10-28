export type EQuestionType = "image" | "video" | "text" | "beNearest" | "fillEmptySpaces";
export type EDifficulty = "any" | "easy" | "medium" | "hard" | "devil";

export interface IMediaQuestion {
  src: string;
  candidates: string[];
  answer: number[]; // table of candidates indexes.
}
export type ITextQuestion = Omit<IMediaQuestion, "src">;
export interface IBeNearestQuestion {
  src?: string;
  answer: number;
}
export interface IFillEmptySpacesQuestion {
  src?: string;
  candidates: string[];
  answer: string;
}

export interface IQuestion {
  id: number;
  version: number;
  difficulty: EDifficulty;
  type: EQuestionType;
  question: string;
  specific: IMediaQuestion | ITextQuestion | IBeNearestQuestion | IFillEmptySpacesQuestion;
}

export interface IMediaQuestionBuilder extends IQuestion {
  type: "image" | "video";
  specific: IMediaQuestion;
}
export interface ITextQuestionBuilder extends IQuestion {
  type: "text";
  specific: ITextQuestion;
}
export interface IBeNearestQuestionBuilder extends IQuestion {
  type: "beNearest";
  specific: IBeNearestQuestion;
}
export interface IFillEmptySpacesQuestionBuilder extends IQuestion {
  type: "fillEmptySpaces";
  specific: IFillEmptySpacesQuestion;
}
