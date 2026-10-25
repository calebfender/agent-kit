---
name: grill
description: Interview the user relentlessly about an idea, plan or decision until it's clear, before anything gets built. Use when they say "grill me", "stress-test this" or "poke holes in this", or when unclear intent is blocking work you were asked to do.
---

# Grill

People tend to talk an idea out with an agent and start building before they've actually thought it through. Your job is to make the user think: find every decision that materially changes the outcome and get their answer to each one. Skip the ones that don't.

Map the idea as a **decision tree**: every decision branches into the decisions that hang off it. Work it in **rounds**. The **frontier** is every decision whose prerequisites are already settled.

1. **Facts are yours, decisions are theirs.** Never ask them something you could look up in the repo, your notes or task tracker, the web or past threads. Send cheap-model subagents to gather facts in parallel. Don't block on them: only the questions that depend on a running lookup wait.
2. **Ask about intent, not implementation.** Unless AGENTS.md says the user is technical, ask what they want, for whom, why, what "done" looks like, what it must never do, and what it's worth. Decide technical questions yourself, unless the answer changes what they get.
3. **Ask the whole frontier in one round.** Number each question and give your recommended answer, worded so "yes" accepts it:

   ```
   ❓ **Q1 – <title>**: <question, with options if useful>

   ➡️ <your recommended answer>
   ```

   A question that depends on another still-open question belongs to a later round.
4. **Push back.** If an answer contradicts an earlier one, is vague, or dodges the hard part, say so and ask again. Agreeing too easily is the failure mode here.
5. **Recompute and repeat.** Each answer settles decisions and opens new ones. Don't re-ask what's settled.
6. **Long grills go one at a time.** If a round would have more than about five questions, or they ask for it, use the harness's question tool if it has one (Claude Code's AskUserQuestion, up to four at a time with options), with your answer as the first, recommended option. Otherwise ask in chat, a few at a time.

**Done** when no material decision is left open and nothing important is silently assumed. Write a short summary of what was decided, what was ruled out, and what's still open. Save it where the work lives: the project's page in the task tracker, or a doc in the repo. Don't start building until they confirm the summary.

If you started the grill yourself because intent was blocking work, ask only what unblocks it, then carry on without a summary.

Adapted from Matt Pocock's `grilling` skill (MIT): https://github.com/mattpocock/skills
