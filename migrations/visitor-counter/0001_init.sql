-- Idempotent D1 initialization for the anonymous, aggregate-only counter.
-- Applied manually with wrangler d1 execute until Cloudflare provisioning is automated.
CREATE TABLE IF NOT EXISTS visitor_counter (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  count INTEGER NOT NULL DEFAULT 0 CHECK (count >= 0)
);
INSERT OR IGNORE INTO visitor_counter (id, count) VALUES (1, 0);
