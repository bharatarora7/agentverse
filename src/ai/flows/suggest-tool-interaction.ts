// src/ai/flows/suggest-tool-interaction.ts
'use server';
/**
 * @fileOverview Suggests optimal interaction strategies between an AI agent and MCP tools.
 *
 * - suggestToolInteraction - A function that suggests interaction strategies.
 * - SuggestToolInteractionInput - The input type for the suggestToolInteraction function.
 * - SuggestToolInteractionOutput - The return type for the suggestToolInteraction function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestToolInteractionInputSchema = z.object({
  agentCapabilities: z
    .string()
    .describe('Description of the AI agent capabilities.'),
  toolSchema: z.string().describe('The schema of the MCP tool.'),
  goal: z.string().describe('The goal the agent is trying to achieve.'),
});
export type SuggestToolInteractionInput = z.infer<
  typeof SuggestToolInteractionInputSchema
>;

const SuggestToolInteractionOutputSchema = z.object({
  interactionStrategy: z
    .string()
    .describe(
      'A detailed suggestion for how the AI agent should interact with the MCP tool to achieve the goal.'
    ),
  rationale: z
    .string()
    .describe(
      'The rationale behind the suggested interaction strategy, explaining why it is optimal.'
    ),
});
export type SuggestToolInteractionOutput = z.infer<
  typeof SuggestToolInteractionOutputSchema
>;

export async function suggestToolInteraction(
  input: SuggestToolInteractionInput
): Promise<SuggestToolInteractionOutput> {
  return suggestToolInteractionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestToolInteractionPrompt',
  input: {
    schema: SuggestToolInteractionInputSchema,
  },
  output: {
    schema: SuggestToolInteractionOutputSchema,
  },
  prompt: `You are an expert in AI agent and tool interaction optimization.

  Given the following AI agent capabilities, MCP tool schema, and the agent's goal, suggest an optimal interaction strategy and explain the rationale behind it.

  AI Agent Capabilities: {{{agentCapabilities}}}
  MCP Tool Schema: {{{toolSchema}}}
  Goal: {{{goal}}}

  Interaction Strategy and Rationale:
  `, // Removed ```json to avoid escaping issues
});

const suggestToolInteractionFlow = ai.defineFlow(
  {
    name: 'suggestToolInteractionFlow',
    inputSchema: SuggestToolInteractionInputSchema,
    outputSchema: SuggestToolInteractionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
