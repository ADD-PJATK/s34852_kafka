# AA4 mock stack + integration (use scripts/*.ps1 on Windows)
.PHONY: mock test demo pipeline

MOCK_PORT ?= 4000
export MOCK_BASE ?= http://127.0.0.1:$(MOCK_PORT)

mock:
	./scripts/run_mock.sh

test:
	./scripts/run_tests.sh

pipeline:
	cd integration/pipeline && node run.mjs

demo:
	./scripts/demo.sh
