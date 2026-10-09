For my client Brackets, I spent weeks upgrading a CRM and the people who use it every day will not notice a single thing. That was the goal.

The system is what a financial services company runs its business on: clients, leads, mortgage and insurance calculators, generated proposals, a mobile app connected to it. In production for years, with real client data in it.

⬆️ PHP went from 8.1 to 8.5. Laravel went from 9 to 13, four major versions in one go. The dependency audit went from 51 vulnerabilities to 2 (both of those sit in development tooling that never reaches production).

What did not change: the database, the business logic, and every screen the staff use. Nobody has to relearn anything, and nobody had to stop working while it happened.

A test suite somebody wrote years ago made it provable, and it stayed green at every step. That did not make it easy. Four major versions, a language upgrade and a long list of replaced packages still have to happen in an order where nothing breaks, on a system real people are using that week. That part is the job.

And if your system has no tests at all, it is not a lost cause. It just means the safety net gets built first, before anything is touched.

---
I'm Lukas from Legacy Upgrade, and the best upgrades are the ones nobody notices.
