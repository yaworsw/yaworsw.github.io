CC      ?= cc
CFLAGS  ?= -Wall -Wextra -Wimplicit-fallthrough -std=c11 -O2
BIN     := demo
TEST    := test_migration

.PHONY: all run test clean

all: $(BIN) $(TEST)

$(BIN): main.c migration.c migration.h
	$(CC) $(CFLAGS) -o $(BIN) main.c migration.c

$(TEST): test.c migration.c migration.h
	$(CC) $(CFLAGS) -o $(TEST) test.c migration.c

run: $(BIN)
	./$(BIN)

test: $(TEST)
	./$(TEST)

clean:
	rm -f $(BIN) $(TEST)
