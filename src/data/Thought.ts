export type Thought = {
  id: string;
  text: string;
};

export const newThought = (text: string): Thought => {
  return { id: crypto.randomUUID(), text: text };
};
