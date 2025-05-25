import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, TestTube2, Puzzle, ListChecks, DollarSign } from 'lucide-react';

export default function DashboardPage() {
  const quickAccessItems = [
    { title: 'Agent Tester', description: 'Test AI agents', href: '/agent-tester', icon: TestTube2, color: 'text-purple-500' },
    { title: 'Tool Integrator', description: 'Integrate MCP tools', href: '/tool-integrator', icon: Puzzle, color: 'text-blue-500' },
    { title: 'Scenario Editor', description: 'Manage test scenarios', href: '/scenario-editor', icon: ListChecks, color: 'text-green-500' },
    { title: 'Cost Analysis', description: 'Estimate agent costs', href: '/cost-analysis', icon: DollarSign, color: 'text-yellow-500' },
  ];

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8">
      <PageHeader 
        title="Welcome to AgentVerse!" 
        description="Your platform for testing AI agents and MCP tools."
      />
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>
            Explore the features of AgentVerse to streamline your AI development workflow. 
            Here are some quick links to get you started:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickAccessItems.map((item) => (
              <Link href={item.href} key={item.title} legacyBehavior>
                <a className="block group">
                  <Card className="hover:shadow-md transition-shadow duration-200 h-full">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-lg font-medium">{item.title}</CardTitle>
                      <item.icon className={`h-6 w-6 ${item.color}`} />
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      <Button variant="link" className="p-0 h-auto mt-2 text-primary group-hover:underline">
                        Go to {item.title} <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </a>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
            <CardTitle>Platform Overview</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">
                AgentVerse provides a comprehensive suite of tools for AI agent development:
            </p>
            <ul className="list-disc list-inside mt-2 text-muted-foreground space-y-1">
                <li><strong>Agent Tester:</strong> Upload agent configurations and test them against predefined or custom scenarios in a playground-like environment.</li>
                <li><strong>Tool Integrator:</strong> Use generative AI to test interactions between your AI agent and MCP tools for any new AI agent frameworks.</li>
                <li><strong>Scenario Editor:</strong> Create, edit, and save testing scenarios, including environment configuration, agent goals, and acceptance criteria.</li>
                <li><strong>Cost Analysis:</strong> Estimate operational costs for agents using different tool configurations and receive budget guidance.</li>
                <li><strong>Dynamic UI:</strong> Interface components adapt to different agent frameworks and tool schemas.</li>
                <li><strong>Detailed Logging:</strong> Capture and review every interaction step during tests.</li>
            </ul>
        </CardContent>
      </Card>

    </div>
  );
}
