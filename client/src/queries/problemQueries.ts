import middleware from "./middleware";

export type Tag = {
  name: string;
  slug: string;
};

// problem schema
export interface ProblemInfo {
  questionId: string;
  title: string;
  titleSlug: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topicTags: Tag[];
  link: string;
}

interface ProblemInfoResponse {
  problemInfo?: ProblemInfo;
  success: boolean;
  msg?: string;
}

export interface Problem {
  problem: ProblemInfo;
  status: string;
  updatedAt: string;
}

//  response from querying and submiting single
interface ProblemResponse {
  problem?: Problem;
  success: boolean;
  msg?: string;
}

export interface ProblemsResponse {
  problems: Problem[] | [];
  success: boolean;
  msg?: string;
}

const getHeaders = (token: string) => {
  return { "Content-Type": "application/json", "Authorization": token };
};

export const problemQueries = {
  createProblem: async (
    body: Problem,
    token: string
  ): Promise<ProblemsResponse> => {
    const response: ProblemsResponse = await middleware.postQuery(
      "item/",
      JSON.stringify(body),
      getHeaders(token)
    );

    return response;
  },
  getAllProblems: async (token: string): Promise<ProblemsResponse> => {
    const response: ProblemsResponse = await middleware.getQuery(
      "item/",
      getHeaders(token)
    );

    return response;
  },
  deleteProblem: async (
    title: string,
    token: string
  ): Promise<ProblemsResponse> => {
    const response: ProblemsResponse = await middleware.deleteQuery(
      "item/",
      JSON.stringify({ title }),
      getHeaders(token)
    );

    return response;
  },
  getProblemInfo: async (titleSlug: string): Promise<ProblemInfoResponse> => {
    const response: ProblemInfoResponse = await middleware.postQuery(
      "item/getProblemInfo",
      JSON.stringify({ titleSlug }),
      { "Content-Type": "application/json" }
    );
    return response;
  },
};
