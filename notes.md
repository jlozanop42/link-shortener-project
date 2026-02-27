When creating a custom agent we have two options
* .github/agents: The agent will only be accessible for the project.
* user data: The agent will be accessible to any project, not only the one in progress.

To use a custom prompt, use the slash command:
Like /create-copilot-instructions

MCP server definition
It exposes github copilot chat (or any LLM) a bunch of tools with a particular
third party service, like Neon database. Then, github copilot chat can interact via these tools with that third party services.

* List all Neon database projects.
* For example run some SQL queries and insert some data to the database.

This means we can do these using natural language directly in vscode.
