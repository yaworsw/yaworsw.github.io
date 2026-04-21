#include "migration.h"

static void migrate_1_to_2(config_t *cfg) {
    cfg->led_brightness = 128;
    cfg->version = 2;
}

static void migrate_2_to_3(config_t *cfg) {
    cfg->motion_sensitivity = 5;
    cfg->version = 3;
}

static void migrate_3_to_4(config_t *cfg) {
    cfg->sleep_timeout_s = 300;
    cfg->version = 4;
}

bool config_migrate(config_t *cfg) {
    bool migrated = false;
    switch (cfg->version) {
        case 1:
            migrate_1_to_2(cfg);
            migrated = true;
            __attribute__((fallthrough));
        case 2:
            migrate_2_to_3(cfg);
            migrated = true;
            __attribute__((fallthrough));
        case 3:
            migrate_3_to_4(cfg);
            migrated = true;
            __attribute__((fallthrough));
        case SCHEMA_VERSION_CURRENT:
            break;
        default:
            return false;
    }
    return migrated;
}
