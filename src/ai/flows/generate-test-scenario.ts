'use server';

/**
 * @fileOverview Generates a detailed test scenario configuration from a high-level description.
 *
 * - generateTestScenario - A function that generates a detailed test scenario configuration.
 * - GenerateTestScenarioInput - The input type for the generateTestScenario function.
 * - GenerateTestScenarioOutput - The return type for the generateTestScenario function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTestScenarioInputSchema = z.object({
  scenarioDescription: z
    .string()
    .describe('A high-level description of the test scenario.'),
});
export type GenerateTestScenarioInput = z.infer<typeof GenerateTestScenarioInputSchema>;

const GenerateTestScenarioOutputSchema = z.object({
  environmentSettings: z
    .string()
    .describe('Detailed environment settings for the test scenario.'),
  agentGoals: z.string().describe('Specific goals for the agent in the test scenario.'),
  acceptanceCriteria: z
    .string()
    .describe('Acceptance criteria for the agent to be considered successful.'),
});
export type GenerateTestScenarioOutput = z.infer<typeof GenerateTestScenarioOutputSchema>;

export async function generateTestScenario(
  input: GenerateTestScenarioInput
): Promise<GenerateTestScenarioOutput> {
  return generateTestScenarioFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTestScenarioPrompt',
  input: {schema: GenerateTestScenarioInputSchema},
  output: {schema: GenerateTestScenarioOutputSchema},
  prompt: `You are an expert in creating detailed test scenarios for AI agents.

  Based on the following high-level description, generate a detailed scenario configuration, including appropriate environment settings, agent goals, and acceptance criteria.

  Scenario Description: {{{scenarioDescription}}}

  Environment Settings:
  Agent Goals:
  Acceptance Criteria:`,
});

const generateTestScenarioFlow = ai.defineFlow(
  {
    name: 'generateTestScenarioFlow',
    inputSchema: GenerateTestScenarioInputSchema,
    outputSchema: GenerateTestScenarioOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
