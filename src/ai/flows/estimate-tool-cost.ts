// src/ai/flows/estimate-tool-cost.ts
'use server';

/**
 * @fileOverview Estimates the cost of using different tool configurations for AI agents.
 *
 * - estimateToolCost - A function that estimates the cost of tool configurations.
 * - EstimateToolCostInput - The input type for the estimateToolCost function.
 * - EstimateToolCostOutput - The return type for the estimateToolCost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EstimateToolCostInputSchema = z.object({
  agentType: z.string().describe('The type of AI agent (e.g., customer service, data analysis).'),
  toolConfigurations: z.string().describe('A JSON string describing the tool configurations, including tool types, usage frequency, and pricing models.'),
  historicalUsageData: z.string().describe('A JSON string of historical usage data for the agent and tools, including timestamps, tool usage counts, and cost per use.'),
  budgetLimit: z.number().describe('The maximum budget limit for the agent.').optional(),
});

export type EstimateToolCostInput = z.infer<typeof EstimateToolCostInputSchema>;

const EstimateToolCostOutputSchema = z.object({
  estimatedCost: z.number().describe('The estimated cost of the tool configuration.'),
  costBreakdown: z.string().describe('A detailed breakdown of the estimated cost by tool.'),
  budgetGuidance: z.string().describe('Guidance on optimizing tool usage to stay within budget.'),
  alerts: z.string().describe('Any alerts indicating potential overspending or inefficient tool usage.'),
});

export type EstimateToolCostOutput = z.infer<typeof EstimateToolCostOutputSchema>;

export async function estimateToolCost(input: EstimateToolCostInput): Promise<EstimateToolCostOutput> {
  return estimateToolCostFlow(input);
}

const estimateToolCostPrompt = ai.definePrompt({
  name: 'estimateToolCostPrompt',
  input: {
    schema: EstimateToolCostInputSchema,
  },
  output: {
    schema: EstimateToolCostOutputSchema,
  },
  prompt: `You are an expert in cost analysis for AI agents. Analyze the provided data to estimate the cost of using different tool configurations.

  Agent Type: {{{agentType}}}
  Tool Configurations: {{{toolConfigurations}}}
  Historical Usage Data: {{{historicalUsageData}}}
  Budget Limit: {{{budgetLimit}}}

  Based on this information, provide:
  - An estimated cost of the tool configuration.
  - A detailed breakdown of the estimated cost by tool.
  - Guidance on optimizing tool usage to stay within budget.
  - Any alerts indicating potential overspending or inefficient tool usage.

  Ensure that the output is a valid JSON object matching the schema.
  `, // Ensure valid JSON format
});

const estimateToolCostFlow = ai.defineFlow(
  {
    name: 'estimateToolCostFlow',
    inputSchema: EstimateToolCostInputSchema,
    outputSchema: EstimateToolCostOutputSchema,
  },
  async input => {
    const {output} = await estimateToolCostPrompt(input);
    return output!;
  }
);
