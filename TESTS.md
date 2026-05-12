# Automated Tests

## audit-engine.test.ts

This test suite validates the core AI spend audit engine logic.

---

## Test Coverage

### 1. Detect unnecessary team plans

Verifies that the audit engine identifies overspending when very small teams are subscribed to collaboration-heavy plans.

---

### 2. Reduce enterprise overspending

Ensures that enterprise plans for small teams trigger optimization recommendations and savings calculations.

---

### 3. Calculate annual savings correctly

Confirms that annual savings are always derived consistently from monthly savings calculations.

---

### 4. Generate optimization recommendations

Checks that recommendation objects are returned correctly for supported tools and pricing situations.

---

### 5. Handle already optimized plans

Ensures the audit engine behaves safely when users are already on financially reasonable plans.

---

## How to Run Tests

Run all tests:

```bash
npm run test
```

---

## Testing Stack

- Vitest
- Testing Library
- jsdom

---

## Why These Tests Matter

The audit engine is the most critical business component in the application.

Incorrect savings calculations would:
- reduce trust
- create unrealistic expectations
- weaken lead quality

These tests ensure the optimization logic remains deterministic and financially defensible.