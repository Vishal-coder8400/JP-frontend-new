import { profileCompletionRules } from "./rule";

export function calculateProfileCompletion(user, role) {
  const rules = profileCompletionRules[role] || {};
  const completion = {};

  for (const [key, checkFn] of Object.entries(rules)) {
    completion[key] = checkFn(user);
  }

  return completion;
}
export const getNextIncompleteStep = (completionObj) => {
  for (const [page, completed] of Object.entries(completionObj)) {
    if (!completed) return page;
  }
  return null;
};
