#include <assert.h>
#include <stdio.h>
#include "migration.h"

static void test_v1_migrates_to_current(void) {
    config_t cfg = { .version = 1, .device_id = 0x1111 };
    bool migrated = config_migrate(&cfg);
    assert(migrated);
    assert(cfg.version == SCHEMA_VERSION_CURRENT);
    assert(cfg.device_id == 0x1111);
    assert(cfg.led_brightness == 128);
    assert(cfg.motion_sensitivity == 5);
    assert(cfg.sleep_timeout_s == 300);
}

static void test_v2_migrates_to_current(void) {
    config_t cfg = { .version = 2, .device_id = 0x2222, .led_brightness = 64 };
    bool migrated = config_migrate(&cfg);
    assert(migrated);
    assert(cfg.version == SCHEMA_VERSION_CURRENT);
    assert(cfg.led_brightness == 64);
    assert(cfg.motion_sensitivity == 5);
    assert(cfg.sleep_timeout_s == 300);
}

static void test_v3_migrates_to_current(void) {
    config_t cfg = {
        .version = 3,
        .device_id = 0x3333,
        .led_brightness = 200,
        .motion_sensitivity = 9,
    };
    bool migrated = config_migrate(&cfg);
    assert(migrated);
    assert(cfg.version == SCHEMA_VERSION_CURRENT);
    assert(cfg.led_brightness == 200);
    assert(cfg.motion_sensitivity == 9);
    assert(cfg.sleep_timeout_s == 300);
}

static void test_current_is_noop(void) {
    config_t cfg = {
        .version = SCHEMA_VERSION_CURRENT,
        .device_id = 0x4444,
        .led_brightness = 10,
        .motion_sensitivity = 1,
        .sleep_timeout_s = 60,
    };
    bool migrated = config_migrate(&cfg);
    assert(!migrated);
    assert(cfg.version == SCHEMA_VERSION_CURRENT);
    assert(cfg.led_brightness == 10);
    assert(cfg.motion_sensitivity == 1);
    assert(cfg.sleep_timeout_s == 60);
}

static void test_unknown_version_rejected(void) {
    config_t cfg = { .version = 99, .device_id = 0x5555 };
    bool migrated = config_migrate(&cfg);
    assert(!migrated);
    assert(cfg.version == 99);
}

static void test_zero_version_rejected(void) {
    config_t cfg = { .version = 0 };
    bool migrated = config_migrate(&cfg);
    assert(!migrated);
}

int main(void) {
    test_v1_migrates_to_current();
    test_v2_migrates_to_current();
    test_v3_migrates_to_current();
    test_current_is_noop();
    test_unknown_version_rejected();
    test_zero_version_rejected();
    printf("all tests passed\n");
    return 0;
}
