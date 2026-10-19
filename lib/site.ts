// Vercel sets VERCEL_PROJECT_PRODUCTION_URL at build time; locally fall back to localhost.
export const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const contact = {
  github: "https://github.com/RamaSai2519",
  email: "founder@journeymen.in",
  linkedin: "https://www.linkedin.com/in/rama-sathya-sai-82140a293",
  resume: "/rama-sathya-sai-resume.pdf",
};

export const sites = {
  journeymen: "https://www.journeymen.in/",
  emporos: "https://emporos.journeymen.in/",
  ledger: "https://ledger.journeymen.in/",
  mohan: "https://www.mohanvisweswar.in/",
  epoch: "https://gitamepoch.vercel.app/",
};

export const repos = {
  arki: "https://github.com/RamaSai2519/ARK-I",
  mark8: "https://github.com/RamaSai2519/mark8",
  backbone: "https://github.com/RamaSai2519/back_bone",
  resume: "https://github.com/RamaSai2519/resume_builder",
};
