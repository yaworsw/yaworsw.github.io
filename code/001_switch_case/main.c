#include <stdio.h>
#include "migration.h"

static void print_config(const char *label, const config_t *cfg) {
    printf("%s\n", label);
    printf("  version            = %u\n", cfg->version);
    printf("  device_id          = %u\n", cfg->device_id);
    printf("  led_brightness     = %u\n", cfg->led_brightness);
    printf("  motion_sensitivity = %u\n", cfg->motion_sensitivity);
    printf("  sleep_timeout_s    = %u\n", cfg->sleep_timeout_s);
}

int main(void) {
    config_t cfg = {
        .version = 1,
        .device_id = 0xDEADBEEF,
    };

    print_config("loaded from flash:", &cfg);

    bool migrated = config_migrate(&cfg);
    printf("\nmigrated = %s\n\n", migrated ? "true" : "false");

    print_config("after migration:", &cfg);
    return 0;
}
