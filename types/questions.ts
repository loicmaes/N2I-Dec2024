export type EQuestionType = "IMAGE" | "VIDEO" | "TEXT" | "NEAREST" | "FILL";
export type EDifficulty = "ANY" | "EASY" | "MEDIUM" | "HARD" | "DEVIL" | "CYBER";

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
  type: "IMAGE" | "VIDEO";
  specific: IMediaQuestion;
}
export interface ITextQuestionBuilder extends IQuestion {
  type: "TEXT";
  specific: ITextQuestion;
}
export interface IBeNearestQuestionBuilder extends IQuestion {
  type: "NEAREST";
  specific: IBeNearestQuestion;
}
export interface IFillEmptySpacesQuestionBuilder extends IQuestion {
  type: "FILL";
  specific: IFillEmptySpacesQuestion;
}
