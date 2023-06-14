import middleware from "./middleware";

type Difficulty = "Easy" | "Medium" | "Hard" | "";
type Status = "Completed" | "In-Progress" | "Planned" | "";

export interface Problem extends ProblemSubmit {
  _id: string;
}

export interface ProblemSubmit {
  id: number;
  name: string;
  difficulty: Difficulty;
  notes: string;
  tags: string;
  status: Status;
  link: string;
}
type ProblemResponse = {
  msg: string;
  savedProblem: Problem;
  success: boolean;
};

type FetchAllResponse = {
  problems?: Problem[];
  success: boolean;
};

const getHeaders = (token: string) => {
  return { "Content-Type": "application/json", "Authorization": token };
};

export const problemQueries = {
  createProblem: async (body: ProblemSubmit, token: string): Promise<ProblemResponse> => {
    const response: ProblemResponse = await middleware.postQuery("item/", JSON.stringify(body), getHeaders(token));

    return response;
  },
  getAllProblems: async (token: string): Promise<FetchAllResponse> => {
    const response: FetchAllResponse = await middleware.getQuery("item/", getHeaders(token));

    return response;
  },
  deleteAllProblems: async (ids: string[], token: string): Promise<ProblemResponse> => {
    const response: ProblemResponse = await middleware.deleteQuery("item/", JSON.stringify(ids), getHeaders(token));

    return response;
  },
};
