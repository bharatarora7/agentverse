import { config } from 'dotenv';
config();

import '@/ai/flows/estimate-tool-cost.ts';
import '@/ai/flows/suggest-tool-interaction.ts';
import '@/ai/flows/generate-test-scenario.ts';