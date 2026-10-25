---
name: correct
description: Turn a mistake agents keep repeating into something that makes it impossible or loud. Use when the user corrects the same thing a second time, says "you keep doing this", or asks to stop a repeated mistake.
---

# Correct

A rule in a file is the weakest fix. Agents copy what they see in code, so fix the code first.

1. **Find the pattern.** Look at the corrections, reverts, threads and code involved. Make sure the same mistake has happened at least twice, and name the mechanism behind it.
2. **Choose the strongest fix that works,** in this order:
   1. **Remove the wrong path:** one owner for the state, one way to do the thing, internals made private.
   2. **Make it unrepresentable** with types or data structures.
   3. **Make it fail loudly** with a lint, CI check or test whose message says what to do instead.
   4. **Write it down** in a skill or the right AGENTS.md, only for judgment that can't be enforced.
3. **Block new cases first.** If old violations are everywhere, stop new ones now and leave the cleanup as a separate task.
4. **Prove the guard works.** Show it rejects a real past mistake, or a copy of one, and that the correct version passes.
5. **Keep behavior the same.** A structural fix shouldn't change what the product does.
6. **Clean up.** Once a mistake is impossible, delete any written rule that warned about it.
7. **Report** the mistake, the level you fixed it at, and the proof. Don't ask the user to decide technical fixes.

Adapted from Lauren Tan's `correct` skill in pstack (Cursor plugins).
