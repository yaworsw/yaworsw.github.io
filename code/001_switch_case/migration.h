#ifndef MIGRATION_H
#define MIGRATION_H

#include <stdint.h>
#include <stdbool.h>

#define SCHEMA_VERSION_CURRENT 4

typedef struct {
    uint8_t  version;
    uint32_t device_id;
    uint8_t  led_brightness;
    uint8_t  motion_sensitivity;
    uint16_t sleep_timeout_s;
} config_t;

bool config_migrate(config_t *cfg);

#endif
