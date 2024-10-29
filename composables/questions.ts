import type {
  EQuestionType,
  IBeNearestQuestion,
  IFillEmptySpacesQuestion,
  IMediaQuestion,
  IQuestion,
  ITextQuestion,
} from "~/types/questions";
import { useToast } from "~/components/ui/toast";

export const useQuestionConfig = () => useState<IQuestion[]>("questionConfig", () => (JSON.parse(localStorage.getItem("questionConfig") ?? "[]")));

export function loadJson(data: string) {
  const json = JSON.parse(data);

  useQuestionConfig().value = json;
  localStorage.setItem("questionConfig", JSON.stringify(json));

  useToast().toast({
    title: "✅ Données chargées !",
    description: "Les données ont été chargées dans votre interface et la sauvegarde a été initialisée ! Bonne configuration.",
  });
}

export function save() {
  localStorage.setItem("questionConfig", JSON.stringify(useQuestionConfig().value));
  useToast().toast({
    title: "✅ Données sauvegardées !",
    description: "Une trace a été sauvegardée ! N'oubliez pas de télécharger l'archive afin de ne pas perdre une trace de modification.",
  });
}
export function download() {
  useJsonDownload(useQuestionConfig().value);
}

export function useComposedAnswerConfig<T extends IQuestion>(id: number) {
  const question = useQuestionConfig().value.find(question => question.id === id) as T;
  const answer = question.specific.answer as number[];

  const registerAnswer = (index: number) => answer.push(index);
  const unloadAnswer = (index: number) => answer.splice(answer.indexOf(index), 1);
  const isInAnswer = (index: number) => answer.includes(index);

  return {
    registerAnswer,
    unloadAnswer,
    isInAnswer,
  };
}

export function addQuestion(type: EQuestionType) {
  const config = useQuestionConfig();
  config.value = [...config.value, {
    id: config.value.length + 1,
    version: 1,
    type,
    difficulty: "any",
    question: "",
    specific: buildQuestion(type),
  }];
  save();
}
export function findQuestion(id: number): IQuestion | undefined {
  return useQuestionConfig().value.find(question => question.id === id);
}
export function deleteQuestion(id: number) {
  const questions = useQuestionConfig();
  const _questions = questions.value.filter(question => question.id !== id);

  questions.value = [..._questions.map((question, index) => {
    question.id = index + 1;
    return question;
  })];
  save();
}

function buildQuestion(type: EQuestionType): IMediaQuestion | ITextQuestion | IBeNearestQuestion | IFillEmptySpacesQuestion {
  switch (type) {
    case "image": case "video":
      return {
        src: "",
        candidates: [],
        answer: [],
      } as IMediaQuestion;
    case "beNearest":
      return {
        answer: 0,
      } as IBeNearestQuestion;
    case "fillEmptySpaces":
      return {
        candidates: [],
        answer: "",
      } as IFillEmptySpacesQuestion;
    default:
      return {
        candidates: [],
        answer: [],
      } as ITextQuestion;
  }
}
